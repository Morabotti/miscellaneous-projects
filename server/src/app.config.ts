import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  env: string
}

const config: ConfigType = {
  port: Number(process.env.SERVER_PORT) || 8080,
  env: process.env.ENVIRONMENT || 'DEVELOPMENT'
}

export default config
