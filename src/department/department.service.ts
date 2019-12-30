import { Logger, Injectable } from '@nestjs/common'
import { Builder, Capabilities, ThenableWebDriver } from 'selenium-webdriver'
import { ScheduleEvent, PackedGroups, PackedSchedule } from '../app.types'
import { ConnectionService } from '../connection/connection.service'
import config from '../app.config'

@Injectable()
export abstract class DepartmentService {
  private readonly logger = new Logger(DepartmentService.name)
  protected driver: null | ThenableWebDriver
  protected isActive: boolean

  constructor (private readonly connectionService: ConnectionService) {
    this.driver = null
    this.isActive = false
  }

  protected buildDriver (): null | ThenableWebDriver {
    if (this.isActive) {
      return null
    }

    const driver = this.builder()
    this.driver = driver
    this.isActive = true
    return driver
  }

  protected async closeDriver() {
    if (!this.isActive || this.driver === null) {
      return
    }
    try {
      await this.driver.close()
      this.driver = null
      this.isActive = false
    } catch (e) {
      this.logger.error('Failed to close driver')
    }
  }

  protected onClassesFetchStart() {
    this.logger.log('Groups fetch start')
  }

  protected onClassesFetchFailed() {
    this.logger.error('Groups fetch failed')
  }

  protected onClassesFetchOver() {
    this.logger.log('Groups fetch over')
  }

  protected onLatestScheduleFetchStart() {
    this.logger.log('Schedule fetch start')
  }

  protected onLatestScheduleFetchFailed() {
    this.logger.error('Schedule fetch failed')
  }

  protected onLatestScheduleFetchOver() {
    this.logger.log('Schedule fetch over')
  }

  protected async sendGroups(packet: PackedGroups) {
    await this.connectionService.sendGroups(packet)
  }

  protected async sendSchedule(packet: PackedSchedule) {
    await this.connectionService.sendLatestSchedule(packet)
  }

  protected getRoom(data: string[]): string | null {
    for (const row of data) {
      const hasExtra = row.indexOf('(')
      const place = hasExtra > -1 ? row.slice(0, hasExtra) : row

      const match = place.match(/^([ABCF][1-9].{3}|(LEC|TF|LEP|UVA|Alere|LM)){1,12}/g)
      if (match && place.length <= 15) {
        return place
      }
    }
    return null
  }

  protected getTeacher(data: string[]): null | string {
    for (const d of data) {
      if (d.length >= 2 && d.length <= 4 && !this.hasNumber(d) && !d.includes('-')) {
        return d
      }
  
      if (d.indexOf('VY') == 0 && !this.hasNumber(d)) {
        if (d.length >= 4 && d.length <= 5) {
          return d
        }
      }
    }
    return null
  }

  protected getGroups(data: string[]): string[] {
    return data.filter(i => i.match(/^[ITS]-|^(VY)-/))
  }

  /** 
   * * Calculate day with past data
   * @param events old events from same week
   * @param column initial column of the event (day), defaults to (-1)
   * @param row row of the item, defaults to (-2)
   */
  protected calculateDay(events: ScheduleEvent[], column: number, row: number) {
    let fetching = true
    let orginal = column
    let latest = 0;

    while (fetching) {
      const adding = events.filter(e => e.day <= orginal && e.length - 1 + e.time >= row && e.time < row ).length
      if (latest !== adding) {
        orginal = orginal + (adding - latest)
        latest = adding
      } else {
        fetching = false
      }
    }
    return orginal
  }

  protected getCurrentTime(d: Date) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    const weekNo = Math.ceil(((((d as any) - yearStart) / 86400000) + config.variables.weekOffset) / 7)
    return {
      year: d.getUTCFullYear(),
      week: 1 //weekNo
    }
  }

  protected isEmptyOrSpaces(group: string) {
    return group === null || group.match(/^ *$/) !== null
  }

  protected addCredentials (url: string) {
    const username = Buffer.from(config.credentials.username, 'base64')
    const password = Buffer.from(config.credentials.password, 'base64')
    return url.replace('https://', `https://${username}:${password}@`)
  }

  protected removeCredentials(url: string, backup: string) {
    if (url.indexOf('secure.puv.fi/') !== -1) {
      const newUrl = url.substring(url.indexOf('secure.puv.fi/'), url.length)
      return `https://${newUrl}`
    } else {
      this.logger.error('Failed to remove credentials')
      return backup
    }
  }

  private hasNumber (string: string): boolean {
    return /\d/.test(string)
  }

  private builder() {
    const capabilities = Capabilities.chrome()
    const options = {
      args: [
        '--disable-notifications',
        '--disable-extensions',
        '--log-level=3',
        '--no-sandbox',
        '--headless',
        '--disable-gpu'
      ]
    }
  
    capabilities.set('goog:chromeOptions', options)
  
    return new Builder()
      .withCapabilities(capabilities)
      .build()
  }
  
  abstract getClasses (): void
  abstract getLatestSchedule (): void
}
