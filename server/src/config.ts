import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  key: string,
  secret: string,
  env: string
}

const config: ConfigType = {
  port: Number(process.env.SERVER_PORT) || 8080,
  key: process.env.KEY || '',
  secret: process.env.SECRET || '',
  env: process.env.ENVIRONMENT || 'DEVELOPMENT'
}

export default config
