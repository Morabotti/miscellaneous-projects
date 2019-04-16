import * as express from 'express'
import * as path from 'path'
import * as schedule from 'node-schedule'
import { bot } from './services/DiscordService'

import config from './config'
import { routineScrape } from './services/StatsScrapper'

const app = express()
var rule = new schedule.RecurrenceRule()
rule.hour = 0
rule.minute = 1
rule.second = 5

bot.on('ready', (evt) => {
  console.log(`[BOT]: Bot ${bot.id} has connected to channel`)
})

schedule.scheduleJob(rule, async () => {
  await routineScrape()
  //await scrapper_tech.GetMultipleWeeks();
  //await scrapper_social.GetMultipleWeeks();
})

export default app
