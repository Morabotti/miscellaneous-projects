import { Controller } from '@tsed/common'
import { GET, POST } from '../helpers/methods'

@Controller('/:schoolId/settings')
export class SettingsController {
  @GET()
  public Test() {
    return 'End-point test'
  }

  @POST()
  public PostTest() {
    return 'End-point test'
  }
}