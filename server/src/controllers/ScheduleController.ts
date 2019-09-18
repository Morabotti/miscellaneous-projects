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

router.get('/teacher/:teacher', async (req: Request, res: Response) => {
  try {
    const teacher = await DB.getTeacher(req.params.teacher)
    return res.status(200).send(teacher)
  }
  catch (e) {
    return res
      .status(404)
      .send(e)
  }
})

router.get('/location/:room', async (req: Request, res: Response) => {
  try {
    const roomParam: string = req.params.room
    const location = roomParam.split('-')[0]

    const room = await DB.getRoom(location)
    return res.status(200).send(room)
  }
  catch (e) {
    return res
      .status(404)
      .send(e)
  }
})

router.post('/report/vamk/:group/:week', async (req: Request, res: Response) => {
  console.info(`[REPORT] | [USER]: ${req.params.group} | Week number: ${req.params.week}`)
  return res.sendStatus(200)
})

export default router