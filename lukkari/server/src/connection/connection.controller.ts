import { Controller, Body, Res, HttpStatus, Post, Param } from '@nestjs/common'
import { ConnectionService } from './connection.service'
import { TestConnectionDto } from './dto/test-connection.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { Response } from 'express'
import { UpdateGroupDto } from './dto/update-group.dto'

@Controller('/api/connection')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @Post()
  public async testConnection(
    @Body() testConnectionDto: TestConnectionDto,
    @Res() res: Response
  ): Promise<Response> {
    const auth = this.connectionService.verifyConnection(
      testConnectionDto.token,
      testConnectionDto.name
    )

    if (!auth) {
      return res.status(HttpStatus.UNAUTHORIZED).send()
    }

    try {
      const data = await this.connectionService.getCurrentSituation(testConnectionDto.name)
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }
  }

  @Post('/update/:source/schedule')
  public async updateSchedule(
    @Body() updateScheduleDto: UpdateScheduleDto,
    @Res() res: Response,
    @Param('source') source
  ): Promise<Response> {
    if (source !== 'vamk') {
      return res.status(HttpStatus.UNAUTHORIZED).send()
    }

    const auth = this.connectionService.verifyConnection(
      updateScheduleDto.token,
      updateScheduleDto.name
    )

    if (!auth) {
      return res.status(HttpStatus.UNAUTHORIZED).send()
    }

    try {
      this.connectionService.updateSchedule(updateScheduleDto, source)
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }

    return res.status(HttpStatus.OK).send()
  }

  @Post('/update/:source/groups')
  public async updateGroups(
    @Body() updateGroupDto: UpdateGroupDto,
    @Res() res: Response,
    @Param('source') source
  ): Promise<Response> {
    if (source !== 'vamk') {
      return res.status(HttpStatus.UNAUTHORIZED).send()
    }

    const auth = this.connectionService.verifyConnection(
      updateGroupDto.token,
      updateGroupDto.name
    )

    if (!auth) {
      return res.status(HttpStatus.UNAUTHORIZED).send()
    }

    try {
      this.connectionService.updateGroups(updateGroupDto, source)
    } catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send()
    }

    return res.status(HttpStatus.OK).send()
  }
}
