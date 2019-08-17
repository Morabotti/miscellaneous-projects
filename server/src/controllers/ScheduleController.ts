import * as bodyParser from 'body-parser'
import { Request, Response, Router } from 'express'
import * as DB from '../services/DatabaseService'

const router = Router()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/departments', async (req: Request, res: Response) => {
  try {
    const departments = await DB.getDepartments()
    return res.status(200).send(departments)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/classes/:department', async (req: Request, res: Response) => {
  try {
    const department = req.params.department
    const classes = await DB.getClasses(department)
    return res.status(200).send(classes)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/classes/:department', async (req: Request, res: Response) => {
  try {
    const department = req.params.department
    const classes = await DB.getClasses(department)
    return res.status(200).send(classes)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

router.get('/schedule/:department/:class', async (req: Request, res: Response) => {
  try {
    const schedule = await DB.getSchedule(
      req.params.department,
      req.params.class
    )
    return res.status(200).send(schedule)
  }
  catch (e) {
    return res
      .status(500)
      .send(e)
  }
})

export default router