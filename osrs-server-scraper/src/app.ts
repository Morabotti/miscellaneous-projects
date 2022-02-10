import * as express from 'express'
import * as schedule from 'node-schedule'
import { bot } from './services/DiscordService'

import config from './config'
import { routineScrape } from './services/StatsScrapper'

const app = express()

bot.on('ready', (evt) => {
  console.log(`[BOT]: Bot ${bot.id} has connected to channel`)
})

schedule.scheduleJob(`*/${config.scrapeUpdate} * * * * *`, async () => {
  await routineScrape()
})

export default app
