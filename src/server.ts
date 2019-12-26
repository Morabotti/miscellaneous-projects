import { Application, json } from 'express'
import * as helmet from 'helmet'
import { Technology, EconomySocial } from './departments'
import { MasterController } from './controllers'
import { DepartmentService } from './services'
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

    this.startApp()
  }

  private startApp () {
    this.app.listen(config.variables.port, () => {
      console.log(`[BOOT]: Server running on port ${config.variables.port}`)
      this.departmentService.testConnection()
    })
  }

  private configureApp () {
    this.app.use(json())
    this.app.use(helmet())
  }

  private registerControllers () {
    new MasterController(this.app, '/api/master')
  }
}
