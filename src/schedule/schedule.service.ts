import { Injectable, Logger } from '@nestjs/common'
import { Cron, Timeout, NestSchedule } from 'nest-schedule'
import config from '../app.config'
import { EconomySocialService } from '../department/economy-social.service'
import { TechnologyService } from '../department/technology.service'
import { ConnectionService } from 'src/connection/connection.service'
import { CurrentSituation } from 'src/app.types'

@Injectable()
export class ScheduleService extends NestSchedule {
  private readonly logger = new Logger(ScheduleService.name)
  constructor(
    private readonly economySocialService: EconomySocialService,
    private readonly technologyService: TechnologyService,
    private readonly connectionService: ConnectionService
  ) {
    super()
  }

  @Cron('0 1,9,18 * * 0-6')
  public async scheduleJob() {
    if (config.variables.env !== 'DEVELOPMENT') {
      this.logger.log('Started scheduled schedule fetch')
      await this.technologyService.getLatestSchedule()
      await this.economySocialService.getLatestSchedule()
    }
  }

  @Cron('0 4 * * 6')
  public async groupJob() {
    if (config.variables.env !== 'DEVELOPMENT') {
      this.logger.log('Started scheduled group fetch')
      await this.technologyService.getClasses()
      await this.economySocialService.getClasses()
    }
  }

  @Timeout(4000)
  public async initialConnect() {
    try {
      const connection: CurrentSituation = await this.connectionService.testConnection()

      if (!connection) {
        return
      }

      if (!connection.department) {
        await this.technologyService.getClasses()
        await this.economySocialService.getClasses()
      }

      if (!connection.schedules) {
        await this.technologyService.getLatestSchedule()
        await this.economySocialService.getLatestSchedule()
      }
    } catch (e) {
      console.log(e)
    }
  }
}
