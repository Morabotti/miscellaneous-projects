import { Module } from '@nestjs/common'
import { ConnectionModule } from './connection/connection.module'
import { DepartmentModule } from './department/department.module'
import { SchedulerModule } from './schedule/schedule.module'

@Module({
  imports: [
    SchedulerModule,
    ConnectionModule,
    DepartmentModule
  ]
})
export class AppModule {}
