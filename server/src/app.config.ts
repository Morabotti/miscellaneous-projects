import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  env: string,
  vamkSecret: string,
  vamkConnection: string
}

const config: ConfigType = {
  port: Number(process.env.SERVER_PORT) || 8080,
  env: process.env.ENVIRONMENT || 'DEVELOPMENT',
  vamkSecret: process.env.VAMK_SECRET || '',
  vamkConnection: process.env.VAMK_CONNECTION || ''
}

export default config
