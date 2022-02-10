import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '@user/entities'
import { UserRepository } from '@user/user.repo'
import { UserController } from '@user/user.controller'
import { UserService } from '@user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}