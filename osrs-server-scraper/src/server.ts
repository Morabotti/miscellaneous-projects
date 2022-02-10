import app from './app'
import config from './config'
import { initScrapper } from './services/StatsScrapper'

app.listen(config.port, async () => {
  await initScrapper()
  console.log(`[SERVER]: listening on port ${config.port}`)
})
