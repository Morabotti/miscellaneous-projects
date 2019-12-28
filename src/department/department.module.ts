import { Module } from '@nestjs/common'
import { TechnologyService } from './technology.service'
import { EconomySocialService } from './economy-social.service'
import { ConnectionService } from '../connection/connection.service'

@Module({
  providers: [
    TechnologyService,
    EconomySocialService,
    ConnectionService
  ]
})
export class DepartmentModule {}