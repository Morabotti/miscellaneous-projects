import { Get, Controller } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getAPI(): string {
    return this.appService.testAPI()
  }
}
