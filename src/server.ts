import app from './app'
import config from './config'
import { init } from './services/StatsScrapper'

app.listen(config.port, async () => {
  await init()
  console.log(`[SERVER]: listening on port ${config.port}`)
})