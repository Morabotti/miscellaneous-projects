import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Request, Response } from 'express'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/status', (req: Request, res: Response) => {
  res
    .status(200)
    .send({ status: 'OK' })
})

export default router