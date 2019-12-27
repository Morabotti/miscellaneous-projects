import { Application, json } from 'express'
import { RecurrenceRule, Range, scheduleJob } from 'node-schedule'
import { Technology, EconomySocial, Department } from './departments'
import { MasterController } from './controllers'
import { DepartmentService } from './services'
import * as helmet from 'helmet'
import config from './config'

export class Server {
  private departmentService: DepartmentService

  private techology: Technology
  private economySocial: EconomySocial

  constructor (private app: Application) {
    this.configureApp()
    this.registerControllers()

    this.departmentService = new DepartmentService()

    this.techology = new Technology(this.departmentService)
    this.economySocial = new EconomySocial(this.departmentService)

    this.createSchedule()
    this.startApp()
  }

  private startApp () {
    this.app.listen(config.variables.port, async () => {
      console.log(`[BOOT]: Server running on port ${config.variables.port}`)
      const connect = await this.departmentService.testConnection()
      if (connect) {
        await this.techology.getClasses()
        await this.economySocial.getClasses()
      }
    })
  }

  private createSchedule () {
    if (config.variables.env !== 'DEVELOPMENT') {
      const rule = new RecurrenceRule()
      rule.dayOfWeek = [new Range(0, 6)]
      rule.hour = [1, 9, 18]
      rule.minute = 0
      rule.second = 0

      scheduleJob(rule, async () => {
        for (const department of this.getDepartments) {
          await department.getLatestSchedule()
        }
      })
    }
  }

  private configureApp () {
    this.app.use(json)
    this.app.use(helmet)
  }

  private registerControllers () {
    new MasterController(this.app, '/api/master', this.getDepartments)
  }

  get getDepartments(): Department[] {
    return [
      this.techology,
      this.economySocial
    ]
  }
}
