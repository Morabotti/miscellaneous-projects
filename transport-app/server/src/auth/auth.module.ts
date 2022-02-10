import { Module } from '@nestjs/common'

import { AuthController } from '@auth/auth.controller'
import { UserModule } from '@user/user.module'

@Module({
  controllers: [AuthController],
  imports: [UserModule]
})
export class AuthModule {}