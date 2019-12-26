import { Request, Response, Application } from 'express'
import { BaseController } from '.'
import { Method } from '../types'

export class MasterController extends BaseController {
  constructor (app: Application, baseRoute: string) {
    super(app, baseRoute)
    this.onControllerRegister(this.constructor.name)
    this.registerRoutes()
  }

  public registerRoutes () {
    this.registerRoute(Method.GET, '/', this.getTest)
  }

  private getTest(req: Request, res: Response) {
    console.log("hehee")
  }
}
