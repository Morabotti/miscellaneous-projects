import { By, ThenableWebDriver, WebElement } from 'selenium-webdriver'
import { Department } from '.'
import { Group, ScheduleList, ScheduleEvent, Week } from '../types'
import { DepartmentService } from '../services'
import config from '../config'

export class Technology extends Department {
  constructor (private departmentSerivce: DepartmentService) {
    super()

    this.onRegister()
  }

  public async getClasses () {
    this.onClassesFetchStart()
    const driver = this.buildDriver()

    if (!driver) {
      this.onClassesFetchFailed()
      return
    }

    const url = this.addCredentials(config.departments.technology)
    await driver.get(url)

    try {
      const firstRoute = await driver.findElement(By.xpath('//table/tbody/tr[2]/td/font/a'))
      await firstRoute.click()
    } catch (e) {
      await this.closeDriver()
      this.onClassesFetchFailed()
      return
    }

    let groups: Group[] = []

    try {
      await this.onGroupList(driver, async (group) => {
        const fullGroup = await group.getText()
        if (!this.isEmptyOrSpaces(fullGroup)) {
          const groupId = fullGroup.substring(0, fullGroup.indexOf(':'))
          const ext = fullGroup.indexOf('ry') !== -1 
            ? 'ry'
            : fullGroup.indexOf('Gr') !== -1
              ? 'Gr'
              : null

          const groupName = ext
            ? fullGroup.substring(fullGroup.indexOf(':') + 1, fullGroup.indexOf(ext) - 1)
            : fullGroup.substring(fullGroup.indexOf(':') + 1, fullGroup.length)

          const group: Group = {
            groupId,
            groupName,
            fullName: fullGroup
          }

          groups = [ ...groups, group ]
        }
      })
    } catch(e) {
      await this.closeDriver()
      this.onClassesFetchFailed()
    }

    await this.closeDriver()
    this.onClassesFetchOver()
  }

  public async getLatestSchedule () {
    this.onLatestScheduleFetchStart()

    const driver = this.buildDriver()
    if (!driver) {
      this.onLatestScheduleFetchFailed()
      return
    }

    const url = this.addCredentials(config.departments.technology)
    await driver.get(url)

    const time = this.getCurrentTime(new Date)
    const weeks = await driver.findElements(By.xpath('//table[@bgcolor="#ffff80"]/tbody/tr'))
    const firstWeekText = await weeks[0].getText()
    const lastWeekText = await weeks[weeks.length - 1].getText()

    const firstWeekNumber = Number(firstWeekText.substring(0, firstWeekText.indexOf(':')))
    const lastWeekNumber = Number(lastWeekText.substring(0, lastWeekText.indexOf(':')))

    const startingWeek = time.week - config.fetchLength.latestMinus <= firstWeekNumber
      ? firstWeekNumber
      : time.week - config.fetchLength.latestMinus
    
    const endingWeek = time.week + config.fetchLength.latestPlus >= lastWeekNumber
      ? lastWeekNumber
      : time.week + config.fetchLength.latestPlus

    for (const week of weeks) {
      const text = await week.getText()
      if (Number(text.substring(0, text.indexOf(':'))) === startingWeek) {
        await week.click()
        break
      }
    }

    let schedules: ScheduleList[] = []
    try {
      await this.onGroupList(driver, async (group) => {
        const fullGroup = await group.getText()
        if (!this.isEmptyOrSpaces(fullGroup)) {
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
      this.onLatestScheduleFetchFailed()
      return
    }

    for (const schedule of schedules) {
      let fullWeeks: Week[] = []
      await driver.get(schedule.url)
      for (let i = startingWeek; i <= endingWeek; i++) {
        const isLastWeek = i === endingWeek
        const weekUrl = this.removeCredentials(schedule.url, config.departments.technology)
        let weekData: ScheduleEvent[] = []

        for (let row = config.sizes.rows[0]; row <= config.sizes.rows[1]; row++) {
          const rowElement = await driver.findElement(By.xpath(`//table[@bgcolor="#ffff80"]/tbody/tr[${row}]`))
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
                  title: '',
                  day,
                  text,
                  teacher: null,
                  room: null,
                  groups: [],
                  time: i,
                  valid: false,
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
                title, day, text, teacher, room, groups, time: i,
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
    }

    await this.closeDriver()
    this.onLatestScheduleFetchOver()
  }

  private async onGroupList (
    driver: ThenableWebDriver,
    cb: (elem: WebElement) => void
  ) {
    let fetch = false
    const rows = await driver.findElements(By.xpath('//table[@bgcolor="#ffff80"]/tbody/tr'))

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
