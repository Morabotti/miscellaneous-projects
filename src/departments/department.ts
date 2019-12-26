import { ThenableWebDriver } from 'selenium-webdriver'
import { buildDriver } from './driver'
import { ScheduleEvent } from '../types'
import config from '../config'

export abstract class Department {
  protected driver: null | ThenableWebDriver
  protected isActive: boolean

  constructor () {
    this.driver = null
    this.isActive = false
  }

  protected buildDriver (): null | ThenableWebDriver {
    if (this.isActive) {
      return null
    }

    const driver = buildDriver()
    this.driver = driver
    this.isActive = true
    return driver
  }

  protected async closeDriver () {
    if (!this.isActive || this.driver === null) {
      return
    }
    try {
      await this.driver.close()
      this.driver = null
      this.isActive = false
    } catch (e) {
      console.log(`[ERROR]: Failed to close driver [${this.constructor.name}]`)
    }
  }

  protected onRegister () {
    console.log(`[BOOT]: [${this.constructor.name}] Department registered`)
  }

  protected onClassesFetchStart () {
    console.log(`[EVENT]: Groups fetch start on [${this.constructor.name}]`)
  }

  protected onClassesFetchFailed () {
    console.error(`[ERROR]: Groups fetch failed on [${this.constructor.name}]`)
  }

  protected onClassesFetchOver () {
    console.log(`[EVENT]: Groups fetch over on [${this.constructor.name}]`)
  }

  protected onLatestScheduleFetchStart () {
    console.log(`[EVENT]: Schedule fetch start on [${this.constructor.name}]`)
  }

  protected onLatestScheduleFetchFailed () {
    console.error(`[ERROR]: Schedule fetch failed on [${this.constructor.name}]`)
  }

  protected onLatestScheduleFetchOver () {
    console.log(`[EVENT]: Schedule fetch over on [${this.constructor.name}]`)
  }

  protected getRoom (data: string[]): string | null {
    for (const row of data) {
      const hasExtra = row.indexOf('(')
      const place = hasExtra > -1 ? row.slice(0, hasExtra) : row

      const match = place.match(/\b([ABCF][1-9].{3}|(LEC|TF|LEP|UVA|Alere|LM)){1,12}\b/g)
      if (match) {
        return row
      }
    }
    return null
  }

  protected getTeacher (data: string[]): null | string {
    for (const row of data) {
      const match = row.match(/(\b[A-Z]{2,4}\b)|\b(VY_[A-Z]{2,3})\b/g)
      if (match) {
        return row
      }
    }
    return null
  }

  protected getGroups (data: string[]): string[] {
    return data.filter(i => i.match(/[ITS]|(VY)_*/))
  }

  /** 
   * * Calculate day with past data
   * @param events old events from same week
   * @param column initial column of the event (day), defaults to (-1)
   * @param row row of the item, defaults to (-2)
   */
  protected calculateDay (events: ScheduleEvent[], column: number, row: number) {
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

  protected getCurrentTime (d: Date) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    const weekNo = Math.ceil(((((d as any) - yearStart) / 86400000) + config.variables.weekOffset) / 7)
    return {
      year: d.getUTCFullYear(),
      week: 5 //weekNo
    }
  }

  protected isEmptyOrSpaces (group: string) {
    return group === null || group.match(/^ *$/) !== null
  }

  protected addCredentials (url: string) {
    const username = Buffer.from(config.credentials.username, 'base64')
    const password = Buffer.from(config.credentials.password, 'base64')
    return url.replace('https://', `https://${username}:${password}@`)
  }

  protected removeCredentials (url: string, backup: string) {
    if (url.indexOf('secure.puv.fi/') !== -1) {
      const newUrl = url.substring(url.indexOf('secure.puv.fi/'), url.length)
      return `https://${newUrl}`
    } else {
      console.error(`[ERROR]: Failed to remove credentials [${this.constructor.name}]`)
      return backup
    }
  }

  abstract getClasses (): void
  abstract getLatestSchedule (): void
}
