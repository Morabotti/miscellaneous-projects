import * as express from 'express'
import { Server } from './server'

const boostrap = () => {
  const app = express()
  new Server(app)
}

boostrap()
