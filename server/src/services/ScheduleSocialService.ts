
import * as jsonfile from 'jsonfile'
import config from '../config'
import * as analyze from '../helpers/data'
import * as webdriver from 'selenium-webdriver'
import { getWeekNumber } from '../helpers/date'
import { ScheduleEvent } from '../types'

const By = webdriver.By

const buf = Buffer.from(config.key, 'base64')
const buffed = Buffer.from(config.secret, 'base64')
const url = "https://" + buf + ":" + buffed + "@secure.puv.fi/bet/studies/lukujarj/2019-2020/S19/s19.htm";

const chromeCapabilities = webdriver.Capabilities.chrome()
const chromeOptions = { 'args': ['--disable-notifications', '--no-sandbox', '--headless', '--disable-gpu'] }
chromeCapabilities.set('chromeOptions', chromeOptions)

//WeekNum | Ensimmäinen viikko | Manuaalisesti
const FirstWeekOfYear = 35;
//WeekNum | VIimeinen viikko //#endregion| Manuaalisesti
const LastWeekOfYear = 46;

//URL ID | Manuaalisesti
const StartOfID = 4;
//URL ID Loppu | Manuaalisesti
const EndOfID = 15;

const FullTableMinus = 3;
const FullTableLength = 4;

//INDEXLISTA
const minTR = 2;
const maxTR = 28;
const minTD = 1;
const maxTD = 3;

//PÄIVÄMÄÄRÄ
const TableMinTr = 3;
const TableMaxTr = 15;
const TableMinTd = 1;
const TableMaxTd = 7;

const returnName = (value: string) => {
  switch (value) {
    case "S-SA":
      return "Sosionomi";
    case "S-SH":
      return "Sairaanhoitaja";
    case "S-SY":
      return "Sosiaali- ja terveysalan kehitys";
    case "S-TH":
      return "Terveydenhoitaja, hoitotyö";
    case "S-SV":
      return "Sairaanhoitajan vastaanottotoiminta";
    case "T-IB":
      return "International business";
    case "T-LT":
      return "Liiketalous";
    case "T-LY":
      return "Liiketoiminta ja yrittäjyys";
    case "T-TK":
      return "Tietojenkäsittely";
    default:
      return "?"
  }
}

export const getSchedule = async () => {
  let driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
  console.log("[SCRAPPER] Started scrapping social at: " + new Date());
  await driver.get(url);
  let WeekStartURL;

  let CurrentWeek = getWeekNumber(new Date());

  let StartPos = CurrentWeek[1] - FullTableMinus;
  if (StartPos < FirstWeekOfYear) { StartPos = FirstWeekOfYear };
  let EndPoint = CurrentWeek[1] + FullTableLength;
  if (EndPoint >= LastWeekOfYear) { EndPoint = LastWeekOfYear };

  var STARTID = StartOfID;
  while (STARTID <= EndOfID) {
    var URLID;
    if (STARTID.toString().length == 1) { URLID = "00" + STARTID.toString(); }
    else if (STARTID.toString().length == 2) { URLID = "0" + STARTID.toString(); }
    else { URLID = STARTID.toString(); }
    await driver.get("https://secure.puv.fi/bet/studies/lukujarj/2019-2020/S19/week" + URLID + ".htm");
    let GetWeekNum = await driver.findElement(By.xpath('/html/body/center[2]/font/b/font/b'));
    let Text = await GetWeekNum.getText();
    let Week = await Text.substr(0, Text.indexOf(':'));
    if (Number(Week) == StartPos) {
      WeekStartURL = await driver.getCurrentUrl();
      break;
    }
    STARTID++
  }

  for (var a = minTR; a <= maxTR; a++) {
    let HOOK_maxTD = maxTD
    if (a == maxTR) { HOOK_maxTD = 1 }
    for (var b = minTD; b <= HOOK_maxTD; b++) {
      let TimeTable;

      try { TimeTable = await driver.findElement(By.xpath('/html/body/center[2]/font/center[1]/b/table/tbody/tr[' + a + ']/td[' + b + ']/font/a')); }
      catch (e) { TimeTable = await driver.findElement(By.xpath('/html/body/center[2]/font/center[1]/b/table/tbody/tr[' + a + ']/td[' + b + ']/font/i/a')); }
      let TimeTableName = await TimeTable.getText();

      let FileName = await TimeTableName.substr(0, TimeTableName.indexOf(':'));
      await TimeTable.click();

      let ObjData: any = [];
      let file;

      if (FileName.charAt(0) == "S") {
        file = await "./db/schedule/sosiaali/" + FileName + ".json"
      }
      else if (FileName.charAt(0) == "T") {
        file = await "./db/schedule/liiketalous/" + FileName + ".json"
      }

      for (var CW = StartPos; CW <= EndPoint; CW++) {
        //UusViikko
        let IsLastWeek = (CW == EndPoint ? true : false)
        let WeekData: any = []

        let WeekURL;
        await driver.getCurrentUrl().then(data => {
          if (data.indexOf("secure.puv.fi/") !== -1) {
            let ph = data.substring(data.indexOf("secure.puv.fi/"), data.length);
            WeekURL = "https://" + ph;
          } else {
            WeekURL = "http://www.puv.fi/fi/study/lukuvuosi/tyojarjestykset/"
          }
        });

        for (var i = TableMinTr; i <= TableMaxTr; i++) {

          await new Promise(resolve => setTimeout(resolve, 4));

          let Row = await driver.findElement(By.xpath('/html/body/center/table/tbody/tr[' + i + ']'));
          let num = await Row.findElements(By.xpath("td"));

          for (var x = TableMinTd; x <= TableMaxTd; x++) {
            if (num[x] != undefined) {
              await new Promise(resolve => setTimeout(resolve, 4));
              let BGCOLOR = await num[x].getAttribute("bgcolor");
              if (BGCOLOR == '#ffffcc' || BGCOLOR == '#ffe4e1') {
                let title = await num[x].findElement(By.tagName("b")).getText();
                let text = await num[x].getText();
                let eventLength = await num[x].getAttribute("rowspan");
                let day = analyze.calcDay(WeekData, x, i)

                const data = text.split('\n')
                const teacher = analyze.getTeacher(data)
                const room = analyze.getRoom(data)
                const groups = analyze.getGroups(data)

                const newEvent: ScheduleEvent = {
                  title, day, text, teacher, room, groups, time: i,
                  valid: true,
                  length: Number(eventLength) != 0 ? Number(eventLength) : 1,
                }
                WeekData.push(newEvent)
              }
              else if (BGCOLOR === '#cccccc') {
                const text = await num[x].getText()
                const eventLength = await num[x].getAttribute("rowspan")
                let day = analyze.calcDay(WeekData, x, i)
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
                WeekData.push(newEvent)
              }
            }
          }
        }
        ObjData.push({
          group: FileName,
          weekNum: CW,
          weekUrl: WeekURL,
          weekData: WeekData
        });

        if (!IsLastWeek) {
          await driver.findElement(By.xpath("/html/body/center/table/tbody/tr[2]/td[1]/font/b/a[3]")).click();
        }
      }

      jsonfile.writeFile(file, ObjData, { spaces: 2 }, function (err) {
        if (err) console.error(err)
      });

      console.log("[FILENAME]: " + FileName);
      await driver.get(WeekStartURL);
    }
  }

  console.log("[SCRAPPER] Ending scrapper social at: " + new Date());
  await driver.quit();
}

export const getClasses = async () => {
  let driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
  let i = 0;
  let Obj_Sosiaali: any = []
  let Obj_Liiketalous: any = []
  await driver.get(url);
  await driver.findElement(By.xpath('/html/body/center[2]/table/tbody/tr[7]/td[1]/a')).click();
  for (var a = minTR; a <= maxTR; a++) {
    let HOOK_maxTD = maxTD
    if (a == maxTR) { HOOK_maxTD = 1 }
    for (var b = minTD; b <= HOOK_maxTD; b++) {
      let TimeTable;

      try { TimeTable = await driver.findElement(By.xpath('/html/body/center[2]/font/center[1]/b/table/tbody/tr[' + a + ']/td[' + b + ']/font/a')); }
      catch (e) { TimeTable = await driver.findElement(By.xpath('/html/body/center[2]/font/center[1]/b/table/tbody/tr[' + a + ']/td[' + b + ']/font/i/a')); }

      let TimeTableName = await TimeTable.getText();
      let FileShort = await TimeTableName.substr(0, TimeTableName.indexOf(':'));

      let FileName = returnName(FileShort.substring(0, 4));
      let TimeTableNameFull = FileShort + ":" + FileName;

      if (FileShort.charAt(0) == "S") {
        Obj_Sosiaali.push({
          id: i,
          fileShort: FileShort,
          tableName: TimeTableNameFull,
          fileName: FileName
        })
      }
      else if (FileShort.charAt(0) == "T") {
        Obj_Liiketalous.push({
          id: i,
          fileShort: FileShort,
          tableName: TimeTableNameFull,
          fileName: FileName
        })
      }
      i++
    }
  }

  const file_sosiaali = "./db/departments/sosiaali.json"
  const file_liiketalous = "./db/departments/liiketalous.json"

  jsonfile.writeFile(file_sosiaali, Obj_Sosiaali, { spaces: 2 }, function (err) {
    if (err) console.error(err)
  });
  jsonfile.writeFile(file_liiketalous, Obj_Liiketalous, { spaces: 2 }, function (err) {
    if (err) console.error(err)
  });

  await driver.quit();
}
