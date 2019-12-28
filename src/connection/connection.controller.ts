import { Controller, Get, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('/api/master')
export class ConnectionController {

  @Get('/')
  public testConnection(@Res() res: Response): Response {
    return res.status(HttpStatus.OK).send()
  }
}