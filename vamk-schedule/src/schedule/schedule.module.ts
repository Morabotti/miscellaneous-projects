import { Module } from '@nestjs/common'
import { ScheduleModule } from 'nest-schedule'
import { ScheduleService } from './schedule.service'
import { EconomySocialService } from '../department/economy-social.service'
import { TechnologyService } from '../department/technology.service'
import { ConnectionService } from '../connection/connection.service'

@Module({
  imports: [
    ScheduleModule.register()
  ],
  providers: [
    ScheduleService,
    EconomySocialService,
    TechnologyService,
    ConnectionService
  ]
})
export class SchedulerModule {}