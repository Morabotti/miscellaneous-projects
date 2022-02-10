import { Controller, Get, HttpStatus, Res, Param } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { Response } from 'express'

@Controller('/api/schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/vamk/departments')
  public async fetchDepartments(@Res() res: Response): Promise<Response> {
    try {
      const departments = await this.scheduleService.getDepartments()
      return res.status(HttpStatus.OK).json(departments)
    } catch (e) {
      return res.status(HttpStatus.NO_CONTENT).send()
    }
  }

  @Get('/vamk/classes/:department')
  public async fetchClasses(@Param() params, @Res() res: Response): Promise<Response> {
    try {
      if (!params.department) {
        return res.status(HttpStatus.BAD_REQUEST).send()
      }

      const classes = await this.scheduleService.getClasses(params.department)
      return res.status(HttpStatus.OK).json(classes)
    } catch (e) {
      return res.status(HttpStatus.NO_CONTENT).send()
    }
  }

  @Get('/vamk/teacher/:teacher')
  public async fetchTeacher(@Param() params, @Res() res: Response): Promise<Response> {
    try {
      if (!params.teacher) {
        return res.status(HttpStatus.BAD_REQUEST).send()
      }

      const teacher = await this.scheduleService.getTeacher(params.teacher)
      return res.status(HttpStatus.OK).json(teacher)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).send()
    }
  }

  @Get('/vamk/location/:room')
  public async fetchRoom(@Param() params, @Res() res: Response): Promise<Response> {
    try {
      if (!params.room) {
        return res.status(HttpStatus.BAD_REQUEST).send()
      }

      const room = await this.scheduleService.getRoom(params.room)
      return res.status(HttpStatus.OK).json(room)
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).send()
    }
  }

  @Get('/vamk/report/:group/:week')
  public async report(@Param() params, @Res() res: Response): Promise<Response> {
    this.scheduleService.report(`Report: ${params.group} | Week number: ${params.week}`)
    return res.status(HttpStatus.OK).send()
  }

  @Get('/vamk/:department/:class')
  public async fetchSchedule(@Param() params, @Res() res: Response): Promise<Response> {
    try {
      if (!params.department || !params.class) {
        return res.status(HttpStatus.BAD_REQUEST).send()
      }

      const schedule = await this.scheduleService.getSchedule(
        params.department,
        params.class
      )

      return res.status(HttpStatus.OK).json(schedule)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).send()
    }
  }
}
