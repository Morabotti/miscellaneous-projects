import server from './server'
import config from './config'

import * as scheduleTech from './services/ScheduleTechService'
import * as scheduleSocial from './services/ScheduleSocialService'

server.listen(config.port, async () => {
  try {
    if (config.env === 'DEVELOPMENT' || config.secret === '' || config.key === '') {
      throw new Error
    }
    await scheduleSocial.getClasses()
    await scheduleTech.getClasses()
  } catch (e) {
    console.log('Could not fetch classes.')
  }
  console.log('Server listening on port ' + config.port)
})