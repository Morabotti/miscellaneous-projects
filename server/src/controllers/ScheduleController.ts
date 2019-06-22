import { Controller } from '@tsed/common'
import { GET } from '../helpers/methods'

@Controller('/:schoolId/schedule')
export class ScheduleController {
  @GET()
  public Test() {
    return 'End-point test'
  }
}