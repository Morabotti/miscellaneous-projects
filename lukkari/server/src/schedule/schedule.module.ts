import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleController } from './schedule.controller'

@Module({
  imports: [],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
