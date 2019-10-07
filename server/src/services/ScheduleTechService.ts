import * as jsonfile from 'jsonfile'
import { ScheduleEvent, Week } from '../types'
import config from '../config'
import * as analyze from '../helpers/data'
import * as webdriver from 'selenium-webdriver'
import { getWeekNumber } from '../helpers/date'

const By = webdriver.By

const buf = Buffer.from(config.key, 'base64')
const buffed = Buffer.from(config.secret, 'base64')
const url = "https://" + buf + ":" + buffed + "@secure.puv.fi/bet/schedule/2019-2020/S19/mfw.htm"

const chromeCapabilities = webdriver.Capabilities.chrome()
const chromeOptions = { 'args': ['--disable-notifications', '--no-sandbox', '--headless', '--disable-gpu'] }
chromeCapabilities.set('chromeOptions', chromeOptions)

const WeekMIN = 1
const WeekMAX = 52

//WeekNum | Ensimmäinen viikko | Manuaalisesti
const FirstWeekOfYear = 35
//WeekNum | VIimeinen viikko | Manuaalisesti
const LastWeekOfYear = 51

const FullTableMinus = 3
const FullTableLength = 4

const minTR = 2
//Number of rows in table / manuaalisesti
const maxTR = 32
//Number of items in last row in table / manuaalisesti
const lastItems = 2

const minTD = 1
const maxTD = 3
const TableMinTr = 3
const TableMaxTr = 15
const TableMinTd = 1
const TableMaxTd = 7

export const getSchedule = async () => {
    let driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build()
    console.log("[SCRAPPER] Started scrapping tech at: " + new Date())
    await driver.get(url)
    let OpenSites, WhichWeek
    let CurrentWeek = getWeekNumber(new Date())
    let StartPos = CurrentWeek[1] - FullTableMinus
    if (StartPos <= FirstWeekOfYear) { StartPos = FirstWeekOfYear }
    let EndPoint = CurrentWeek[1] + FullTableLength
    if (EndPoint >= LastWeekOfYear) { EndPoint = LastWeekOfYear }
    for (var p = WeekMIN; p <= WeekMAX; p++) {
        OpenSites = await driver.findElement(By.xpath('/html/body/font/font/center/center/font/table/tbody/tr[' + p + ']/td/font/a'))
        let Name = await OpenSites.getText()
        let WeekNum = await Name.substr(0, Name.indexOf(':'))
        if (WeekNum == StartPos) {
            WhichWeek = p
            break
        }
    }
    await OpenSites.click()
    for (var a = minTR; a <= maxTR; a++) {
        let HOOK_maxTD = maxTD
        if (a == maxTR) { HOOK_maxTD = lastItems }
        for (var b = minTD; b <= HOOK_maxTD; b++) {
            let TimeTable
            try { TimeTable = await driver.findElement(By.xpath('/html/body/font/font/center/font/center/b/font/table/tbody/tr[' + a + ']/td[' + b + ']/font/a')) }
            catch (e) { TimeTable = await driver.findElement(By.xpath('/html/body/font/font/center/font/center/b/font/table/tbody/tr[' + a + ']/td[' + b + ']/font/i/a')) }
            let TimeTableName = await TimeTable.getText()
            let FileName = await TimeTableName.substr(0, TimeTableName.indexOf(':'))

            await TimeTable.click()
            let ObjData: any = []
            let file = await "./db/schedule/tekniikka/" + FileName + ".json"
            for (var CW = StartPos; CW <= EndPoint; CW++) {
                // console.log("[NEWWEEK]: " + CW)
                const IsLastWeek = CW === EndPoint
                let weekData: ScheduleEvent[] = []
                let weekUrl
                await driver.getCurrentUrl().then(data => {
                    if (data.indexOf("secure.puv.fi/") !== -1) {
                        let ph = data.substring(data.indexOf("secure.puv.fi/"), data.length)
                        weekUrl = "https://" + ph
                    } else {
                        weekUrl = "http://www.puv.fi/fi/study/lukuvuosi/tyojarjestykset/"
                    }
                })

                for (var i = TableMinTr; i <= TableMaxTr; i++) {
                    await new Promise(resolve => setTimeout(resolve, 3))
                    let row = await driver.findElement(By.xpath('/html/body/font/center/font/table/tbody/tr[' + i + ']'))
                    let num = await row.findElements(By.xpath("td"))
                    for (var x = TableMinTd; x <= TableMaxTd; x++) {
                        if (num[x] != undefined) {
                            await new Promise(resolve => setTimeout(resolve, 4))
                            const BGCOLOR = await num[x].getAttribute("bgcolor")
                            if (BGCOLOR === '#ffffcc' || BGCOLOR === '#ffdab9' || BGCOLOR == '#ffe4e1') {
                                const title = await num[x].findElement(By.tagName("b")).getText()
                                const text = await num[x].getText()
                                const eventLength = await num[x].getAttribute("rowspan")
                                const day = analyze.calcDay(weekData, x, i)

                                const data = text.split('\n')
                                const teacher = analyze.getTeacher(data)
                                const room = analyze.getRoom(data)
                                const groups = analyze.getGroups(data)

                                const newEvent: ScheduleEvent = {
                                    title, day, text, teacher, room, groups, time: i,
                                    valid: true,
                                    length: Number(eventLength) != 0 ? Number(eventLength) : 1,
                                }
                                weekData = [...weekData, newEvent]
                            }
                            else if (BGCOLOR === '#cccccc') {
                                const text = await num[x].getText()
                                const eventLength = await num[x].getAttribute("rowspan")
                                const day = analyze.calcDay(weekData, x, i)
                                const newEvent: ScheduleEvent = {
                                    title: '',
                                    day,
                                    text,
                                    teacher: null,
                                    room: null,
                                    groups: [],
                                    time: i,
                                    valid: false,
                                    length: Number(eventLength) != 0 ? Number(eventLength) : 1,
                                }
                                weekData = [...weekData, newEvent]
                            }
                        }
                    }
                }
                const newWeek: Week = {
                    group: FileName,
                    weekNum: CW,
                    weekUrl: weekUrl,
                    weekData: weekData
                }
                await ObjData.push(newWeek)
                if (!IsLastWeek) {
                    await driver.findElement(By.xpath("/html/body/font/center/font/table/tbody/tr[2]/td[1]/font/b/a[3]")).click()
                }
            }

            jsonfile.writeFile(file, ObjData, { spaces: 2 }, function (err) {
                if (err) console.error(err)
            })

            await console.log("[FILENAME]: " + FileName)
            await driver.findElement(By.xpath("/html/body/font/center/font/table/tbody/tr[2]/td[1]/font/b/a[2]")).click()
            await driver.findElement(By.xpath('/html/body/font/font/center/center/font/table/tbody/tr[' + WhichWeek + ']/td/font/a')).click()
        }
    }

    console.log("[SCRAPPER] Ending scrapper tech at: " + new Date())
    await driver.quit()
}

export const getClasses = async () => {
    let driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build()
    let i = 0
    let Obj: any = []
    await driver.get(url)
    await driver.findElement(By.xpath('/html/body/font/font/center/center/font/table/tbody/tr[2]/td/font/a')).click()
    for (var a = minTR; a <= maxTR; a++) {
        let HOOK_maxTD = maxTD
        if (a == maxTR) { HOOK_maxTD = lastItems }
        for (var b = minTD; b <= HOOK_maxTD; b++) {
            let TimeTable
            try { TimeTable = await driver.findElement(By.xpath('/html/body/font/font/center/font/center/b/font/table/tbody/tr[' + a + ']/td[' + b + ']/font/a')) }
            catch (e) { TimeTable = await driver.findElement(By.xpath('/html/body/font/font/center/font/center/b/font/table/tbody/tr[' + a + ']/td[' + b + ']/font/i/a')) }
            let TimeTableName = await TimeTable.getText()
            let FileShort = await TimeTableName.substr(0, TimeTableName.indexOf(':'))

            let FileName
            if (TimeTableName.indexOf('ry') !== -1) { FileName = await TimeTableName.substring(TimeTableName.indexOf(':') + 1, TimeTableName.indexOf('ry') - 1) }
            else if (TimeTableName.indexOf('Gr') !== -1) { FileName = await TimeTableName.substring(TimeTableName.indexOf(':') + 1, TimeTableName.indexOf('Gr') - 1) }
            else { FileName = await TimeTableName.substring(TimeTableName.indexOf(':') + 1, TimeTableName.length) }

            Obj.push({
                id: i,
                fileShort: FileShort,
                tableName: TimeTableName,
                fileName: FileName
            })
            i++
        }
    }
    let file = "./db/departments/tekniikka.json"

    jsonfile.writeFile(file, Obj, { spaces: 2 }, function (err) {
        if (err) console.log(err)

        driver.quit()
    })
}