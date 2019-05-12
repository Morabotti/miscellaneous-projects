import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
}

const config: ConfigType = {
  'port': Number(process.env.SERVER_PORT) || 8080
}

export default config
