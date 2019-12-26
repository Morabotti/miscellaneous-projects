import { Application, Request, Response } from 'express'
import { Method } from '../types'

export abstract class BaseController {
  constructor (
    private app: Application,
    private baseRoute: string
  ) { }

  protected registerRoute (
    method: Method,
    route: string,
    func: (req: Request, res: Response) => void
  ) {
    this.onRouteRegister(method, route)
    switch (method) {
      case Method.GET:
        this.app.get(`${this.baseRoute}${route}`, func)
        break
      case Method.POST:
        this.app.post(`${this.baseRoute}${route}`, func)
        break
      case Method.DELETE:
        this.app.delete(`${this.baseRoute}${route}`, func)
        break
      case Method.PUT:
        this.app.put(`${this.baseRoute}${route}`, func)
        break
    }
  }

  protected onControllerRegister (source: string) {
    console.log(`[BOOT]: [${source}] Controller registered`)
  }

  protected onRouteRegister (method: string, path: string) {
    console.log(`[CONTROLLER]: ${method} - ${this.baseRoute}${path}`)
  }
}
