import { Injectable, Logger } from '@nestjs/common'
import { Cron, Timeout, NestSchedule } from 'nest-schedule'
import config from '../app.config'
import { EconomySocialService } from '../department/economy-social.service'
import { TechnologyService } from '../department/technology.service'

@Injectable()
export class ScheduleService extends NestSchedule {
  private readonly logger = new Logger(ScheduleService.name)
  constructor(
    private readonly economySocialService: EconomySocialService,
    private readonly technologyService: TechnologyService
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

  @Timeout(2000)
  public async fetchClasses() {
    if (config.variables.env !== 'DEVELOPMENT') {
      await this.technologyService.getClasses()
      await this.economySocialService.getClasses()
    }
  }
}