import * as express from 'express'
import * as path from 'path'
import * as scheduleTech from './services/ScheduleTechService'
import * as scheduleSocial from './services/ScheduleSocialService'

import config from './config'
import { RecurrenceRule, Range, scheduleJob } from 'node-schedule'
import { ScheduleController } from './controllers'

import { Request, Response, Application } from 'express'

const app: Application = express()

app.use(express.json())
app.use(express.static('../client/build'))

app.use('/assets', express.static(path.join(__dirname, '../assets')))

app.use('/api', ScheduleController)

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
})

const rule = new RecurrenceRule()
rule.dayOfWeek = [new Range(0, 6)]
rule.hour = [1, 9, 18]
rule.minute = 0
rule.second = 0

scheduleJob(rule, async () => {
  if(config.env !== 'DEVELOPMENT') {
    await scheduleTech.getSchedule()
    await scheduleSocial.getSchedule()
  }
})


export default app