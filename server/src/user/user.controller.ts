import { Controller, Res, HttpStatus, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { Response } from 'express'

import { UserService } from '@user/user.service'
import { NewUserDto } from '@user/interfaces'

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  public async getById(
    @Res() res: Response,
    @Param('id') id
  ) {
    try {
      const user = await this.userService.getUser(id)
      return res.status(HttpStatus.OK).json(user)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }

  @Delete('/:id')
  public async deleteById(
    @Res() res: Response,
    @Param('id') id
  ) {
    await this.userService.deleteUser(id)
    return res.status(HttpStatus.OK).send()
  }

  @Get()
  public async getAll(@Res() res: Response) {
    try {
      const users = await this.userService.getUsers()
      return res.status(HttpStatus.OK).json(users)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }

  @Post()
  public async create(
    @Res() res: Response,
    @Body() newUserDto: NewUserDto
  ) {
    try {
      const user = await this.userService.createUser(newUserDto)
      return res.status(HttpStatus.OK).json(user)
    }
    catch (e) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e)
    }
  }
}