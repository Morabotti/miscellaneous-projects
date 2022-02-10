import { Injectable } from '@nestjs/common'
import { By, ThenableWebDriver, WebElement } from 'selenium-webdriver'
import { Group, WeekList, ScheduleList, ScheduleEvent, Week, PackedSchedule, PackedGroups } from '../app.types'
import { ConnectionService } from '../connection/connection.service'
import { DepartmentService } from './department.service'
import config from '../app.config'

@Injectable()
export class EconomySocialService extends DepartmentService {
  constructor (connectionService: ConnectionService) {
    super(connectionService)
  }

  public async getClasses () {
    this.onClassesFetchStart()
    const driver = this.buildDriver()

    if (!driver) {
      this.onClassesFetchFailed()
      return
    }

    const url = this.addCredentials(config.departments.economySocial)
    await driver.get(url)

    try {
      const weekElement = await driver.findElement(
        By.xpath('//table[@bgcolor="#00cccc"]/tbody/tr/td/a[contains(@title, "Weekly timetables:")]')
      )
      await weekElement.click()
    } catch (e) {
      await this.closeDriver()
      this.onClassesFetchFailed()
      return
    }

    let economyGroups: Group[] = []
    let socialGroups: Group[] = []

    try {
      await this.onGroupList(driver, async (elem) => {
        const fullName = await elem.getText()
        if (!this.isEmptyOrSpaces(fullName)) {
          const groupId = await fullName.substring(0, fullName.indexOf(':'))
          const groupName = this.returnName(groupId.substring(0, 4))
  
          const group: Group = {
            groupId,
            fullName,
            groupName
          }
  
          if (groupId.charAt(0) === 'S') {
            socialGroups = [ ...socialGroups, group ]
          } else if (groupId.charAt(0) === 'T') {
            economyGroups = [ ...economyGroups, group ]
          }
        }
      })
    } catch (e) {
      await this.closeDriver()
      this.onClassesFetchFailed()
      return
    }

    await this.closeDriver()
    this.onClassesFetchOver()

    const packetEconomy: PackedGroups = {
      name: config.connections.name,
      department: 'business',
      data: economyGroups,
      token: null
    }

    const packetSocial: PackedGroups = {
      name: config.connections.name,
      department: 'social',
      data: socialGroups,
      token: null
    }

    await this.sendGroups(packetEconomy)
    await this.sendGroups(packetSocial)
  }

  public async getLatestSchedule () {
    this.onLatestScheduleFetchStart()
    const driver = this.buildDriver()

    if (!driver) {
      this.onClassesFetchFailed()
      return
    }

    const url = this.addCredentials(config.departments.economySocial)
    await driver.get(url)

    const time = this.getCurrentTime(new Date)
    const weeksElement = await driver.findElements(
      By.xpath('//table[@bgcolor="#00cccc"]/tbody/tr/td/a[contains(@title, "Weekly timetables:")]')
    )

    let weeks: WeekList[] = []

    for (const weekElement of weeksElement) {
      const url = await weekElement.getAttribute('href')

      if (!weeks.find(i => i.url === url)) {
        const weekText = await weekElement.getText()
        weeks = [...weeks, { url, week: Number(weekText) }]
      }
    }

    const firstWeek = weeks[0].week
    const lastWeek = weeks[weeks.length - 1].week

    const startingWeek = time.week - config.fetchLength.latestMinus <= firstWeek
      ? firstWeek
      : time.week - config.fetchLength.latestMinus
    
    const endingWeek = time.week + config.fetchLength.latestPlus >= lastWeek
      ? lastWeek
      : time.week + config.fetchLength.latestPlus

    const startWeek = weeks.find(i => i.week === startingWeek)

    if (!startWeek) {
      await this.closeDriver()
      this.onClassesFetchFailed()
      return
    }

    await driver.get(startWeek.url)
    let schedules: ScheduleList[] = []

    try {
      await this.onGroupList(driver, async (group) => {
        const fullGroup = await group.getText()
        if (!this.isEmptyOrSpaces(fullGroup) && (fullGroup.charAt(0) === 'T' || fullGroup.charAt(0) === 'S')) {
          const element = await group.findElement(By.xpath('font/*[contains(@href, "")]'))
          const testUrl = await element.getAttribute('href')
          let routeUrl: string | null = null

          if (testUrl === null) {
            const elementWithI = await group.findElement(By.xpath('font/i/a'))
            routeUrl = await elementWithI.getAttribute('href')
          } else {
            routeUrl = testUrl
          }

          const newListing: ScheduleList = {
            url: routeUrl,
            group: fullGroup
          }
  
          schedules = [ ...schedules, newListing ]
        }
      })
    } catch (e) {
      await this.closeDriver()
      this.onClassesFetchFailed()
      return
    }

    try {
      for (const schedule of schedules) {
        let fullWeeks: Week[] = []
        await driver.get(schedule.url)
        for (let i = startingWeek; i <= endingWeek; i++) {
          const isLastWeek = i === endingWeek
          const currentUrl = await driver.getCurrentUrl()
          const weekUrl = this.removeCredentials(currentUrl, config.departments.economySocial)
          let weekData: ScheduleEvent[] = []

          for (let row = config.sizes.rows[0]; row <= config.sizes.rows[1]; row++) {
            const rowElement = await driver.findElement(By.xpath(`//table[@bgcolor="#00cccc"]/tbody/tr[${row}]`))
            const rowChildren = await rowElement.findElements(By.xpath('./td'))

            for (let column = config.sizes.columns[0]; column <= config.sizes.columns[1]; column++) {
              if (rowChildren[column] === undefined) {
                continue
              }

              const element = rowChildren[column]
              const bgColor = await element.getAttribute('bgcolor')
              if (bgColor === '#ffffff') {
                continue
              }

              if (bgColor === '#cccccc') {
                const text = await element.getText()
                const eventLength = await element.getAttribute("rowspan")
                const day = this.calculateDay(weekData, column, row)
                const newEvent: ScheduleEvent = {
                    title: '', day, text, teacher: null, room: null,
                    groups: [], time: row, valid: false,
                    length: Number(eventLength) !== 0 ? Number(eventLength) : 1,
                }
                weekData = [...weekData, newEvent]
              } else {
                const title = await element.findElement(By.tagName('b')).getText()
                const text = await element.getText()
                const eventLength = await element.getAttribute('rowspan')
                const day = this.calculateDay(weekData, column, row)

                const data = text.split('\n')
                const teacher = this.getTeacher(data)
                const room = this.getRoom(data)
                const groups = this.getGroups(data)

                const newEvent: ScheduleEvent = {
                  title, day, text, teacher, room, groups, time: row,
                  valid: true,
                  length: Number(eventLength) !== 0 ? Number(eventLength) : 1,
                }
                weekData = [...weekData, newEvent]
              }
            }
          }

          const newWeek: Week = {
            group: schedule.group.substring(0, schedule.group.indexOf(':')),
            weekNum: i,
            weekUrl,
            weekData
          }

          fullWeeks = [...fullWeeks, newWeek]
  
          if (!isLastWeek) {
            const nextWeek = await driver.findElement(By.xpath('//b/a[contains(@title, "Go to next week")]'))
            await nextWeek.click()
          }
        }

        const packet: PackedSchedule = {
          name: config.connections.name,
          department: schedule.group.charAt(0) === 'T'
            ? 'business'
            : 'social',
          groupId: schedule.group.substring(0, schedule.group.indexOf(':')),
          data: fullWeeks,
          token: null
        }

        await this.sendSchedule(packet)
      }
    } catch (e) {
      await this.closeDriver()
      this.onClassesFetchFailed()
      return
    }

    await this.closeDriver()
    this.onLatestScheduleFetchOver()
  }

  private returnName (value: string) {
    switch (value) {
      case 'S-SA':
        return 'Sosionomi'
      case 'S-SH':
        return 'Sairaanhoitaja'
      case 'S-SY':
        return 'Sosiaali- ja terveysalan kehitys'
      case 'S-TH':
        return 'Terveydenhoitaja, hoitotyö'
      case 'S-SV':
        return 'Sairaanhoitajan vastaanottotoiminta'
      case 'T-IB':
        return 'International business'
      case 'T-LT':
        return 'Liiketalous'
      case 'T-LY':
        return 'Liiketoiminta ja yrittäjyys'
      case 'T-TK':
        return 'Tietojenkäsittely'
      default:
        return '?'
    }
  }

  private async onGroupList (
    driver: ThenableWebDriver,
    cb: (elem: WebElement) => void
  ) {
    let fetch = false
    const rows = await driver.findElements(By.xpath('//table[@bgcolor="#00cccc"]/tbody/tr'))

    for (const row of rows) {
      const children = await row.findElements(By.xpath('./*'))

      if (children.length === 1) {
        const title = await children[0].getText()
        if (title === 'Groups') {
          fetch = true
          continue
        } else {
          fetch = false
          break
        }
      }

      if (fetch) {
        for (const group of children) {
          await cb(group)
        }
      }
    }
  }
}
