import * as express from 'express'
import * as path from 'path'

import ServiceController from './controllers/ServiceController'

const server: express.Application = express()

server.use('/api/service', ServiceController)

export default server