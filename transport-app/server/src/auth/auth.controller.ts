import { Controller, Res, HttpStatus, Post, Body } from '@nestjs/common'
import { Response } from 'express'

import { UserService } from '@user/user.service'
import { LoginDto } from '@user/interfaces'

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  public async create(
    @Res() res: Response,
    @Body() loginDto: LoginDto
  ) {
    try {
      const user = await this.userService.validateLogin(loginDto)
      return res.status(HttpStatus.OK).send(user)
    } catch (e) {
      return res.status(HttpStatus.FORBIDDEN).send()
    }
  }
}