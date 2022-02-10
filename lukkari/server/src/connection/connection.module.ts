import { Module } from '@nestjs/common'
import { ConnectionService } from './connection.service'
import { ConnectionController } from './connection.controller'

@Module({
  imports: [],
  providers: [ConnectionService],
  controllers: [ConnectionController]
})
export class ConnectionModule {}
