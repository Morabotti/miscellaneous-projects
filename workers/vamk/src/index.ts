import server from './server'
import config from './config'

server.listen(config.port, async () => {
  console.log('Server listening on port ' + config.port)
})