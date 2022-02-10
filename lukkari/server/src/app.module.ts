import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ConnectionModule } from './connection/connection.module'
import { ScheduleModule } from './schedule/schedule.module'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
    }),
    ConnectionModule,
    ScheduleModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
