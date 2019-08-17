import * as jsonfile from 'jsonfile'
import config from '../config'
import * as fs from 'fs'
import * as webdriver from 'selenium-webdriver'

const By = webdriver.By

const buf = Buffer.from(config.key, 'base64')
const buffed = Buffer.from(config.secret, 'base64')
const url = "https://" + buf + ":" + buffed + "@secure.puv.fi/bet/schedule/2018-2019/S19/mfw.htm"

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
const maxTR = 33
const minTD = 1
const maxTD = 3

const TableMinTr = 3
const TableMaxTr = 15
const TableMinTd = 1
const TableMaxTd = 7

function getWeekNumber(d: any) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 3) / 7)
    return [d.getUTCFullYear(), weekNo]
}

function calcDay(OBJ: any, KEY: any, I: any) {
    let value = KEY
    let Fix = 0
    let NewFix = 0
    let Fetching = true
    OBJ.forEach(elem => {
        if (elem.Paiva <= value && Number(elem.Pituus) - 1 + elem.Klo >= I && elem.Klo < I) {
            value++
        }
    })

    while (Fetching) {
        let Orginal = Fix
        OBJ.forEach(elem => {
            if (elem.Paiva == (value + Fix) && elem.Klo <= I && Number(elem.Pituus) - 1 + elem.Klo >= I) {
                Fix++
            }
        })
        if (Orginal !== Fix) {
            Fetching = true
        } else {
            Fetching = false
        }
    }
    return value + Fix
}

async function getSchedule() {
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
        if (a == maxTR) { HOOK_maxTD = 1 }
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
                //console.log("[NEWWEEK]: " + CW)
                let IsLastWeek = (CW == EndPoint ? true : false)
                let WeekData: any = await []
                let WeekURL
                await driver.getCurrentUrl().then(data => {
                    if (data.indexOf("secure.puv.fi/") !== -1) {
                        let ph = data.substring(data.indexOf("secure.puv.fi/"), data.length)
                        WeekURL = "https://" + ph
                    } else {
                        WeekURL = "http://www.puv.fi/fi/study/lukuvuosi/tyojarjestykset/"
                    }
                })

                for (var i = TableMinTr; i <= TableMaxTr; i++) {
                    await new Promise(resolve => setTimeout(resolve, 3))
                    let Row = await driver.findElement(By.xpath('/html/body/font/center/font/table/tbody/tr[' + i + ']'))
                    let num = await Row.findElements(By.xpath("td"))
                    for (var x = TableMinTd; x <= TableMaxTd; x++) {
                        if (num[x] != undefined) {
                            await new Promise(resolve => setTimeout(resolve, 4))
                            let BGCOLOR = await num[x].getAttribute("bgcolor")
                            if (BGCOLOR === '#ffffcc' || BGCOLOR === '#ffdab9') {
                                let Otsikko = await num[x].findElement(By.tagName("b")).getText()
                                let KokoTeksti = await num[x].getText()
                                let TunninPituus = await num[x].getAttribute("rowspan")
                                let CurrentDay = calcDay(WeekData, x, i)
                                let NewData: any = {
                                    title: Otsikko,
                                    day: CurrentDay,
                                    time: i,
                                    length: Number(TunninPituus) != 0 ? Number(TunninPituus) : 1,
                                    text: KokoTeksti
                                }
                                await WeekData.push(NewData)
                            }
                        }
                    }
                }
                let NewWeek: any = {
                    weekNum: CW,
                    weekUrl: WeekURL,
                    weekData: WeekData
                }
                await ObjData.push(NewWeek)
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

async function getClasses() {
    let driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build()
    let i = 0
    let Obj: any = []
    await driver.get(url)
    await driver.findElement(By.xpath('/html/body/font/font/center/center/font/table/tbody/tr[2]/td/font/a')).click()
    for (var a = minTR; a <= maxTR; a++) {
        let HOOK_maxTD = maxTD
        if (a == maxTR) { HOOK_maxTD = 1 }
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

            await Obj.push({
                id: i,
                fileShort: FileShort,
                tableName: TimeTableName,
                fileName: FileName
            })
            await i++
        }
    }
    let file = "./db/departments/tekniikka.json"

    jsonfile.writeFile(file, Obj, { spaces: 2 }, function (err) {
        if (err) console.log(err)

        driver.quit()
    })
}


export {
    getClasses,
    getSchedule
}