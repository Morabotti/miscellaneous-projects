import {
  ServerLoader,
  ServerSettings,
  GlobalAcceptMimesMiddleware,
  IErrorsSettings
} from '@tsed/common'

import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as compress from 'compression'
import * as methodOverride from 'method-override'

import config from './config'

const rootDir = __dirname

@ServerSettings({
  rootDir,
  port: config.port,
  acceptMimes: ['application/json'],
  mount: {
    '/api': '${rootDir}/controllers/**/*.ts'
  },
  statics: {
    '/': `${rootDir}/../client/build`
  }
})
export class Server extends ServerLoader {

  public $onMountingMiddlewares(): void|Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
  }

  public $onReady() {
    console.log('Server started...')
  }

  public $onServerInitError(err: IErrorsSettings) {
    console.error(err)
  }
}