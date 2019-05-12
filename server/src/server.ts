import app from './app'
import config from './config'

app.listen(config.port, async () => {
  console.log(`Server listening on port ${config.port}`)
})
