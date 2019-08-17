import server from './server'
import config from './config'

import * as schedule from './services/ScheduleService'

server.listen(config.port, async () => {
  try {
    if (config.env === 'DEVELOPMENT' || config.secret === '' || config.key === '') {
      throw new Error
    }
    await schedule.getClasses()
  } catch (e) {
    console.log('Could not fetch classes from "tekniikka"')
  }
  console.log('Server listening on port ' + config.port)
})