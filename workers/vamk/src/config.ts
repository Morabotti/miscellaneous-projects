import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  serverKey: string
}

const config: ConfigType = {
  port: Number(process.env.SERVER_PORT) || 8080,
  serverKey: process.env.SERVER_KEY || 'randomKey'
}

export default config