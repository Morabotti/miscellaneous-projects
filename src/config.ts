import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  departments: {
    technology: string,
    economySocial: string
  },
  credentials: {
    username: string,
    password: string
  },
  fetchLength: {
    latestMinus: number,
    latestPlus: number
  },
  sizes: {
    rows: [number, number],
    columns: [number, number]
  },
  variables: {
    weekOffset: number,
    port: number
  },
  connections: {
    secret: string,
    name: string,
    url: string,
    port: string
  }
}

const config: ConfigType = {
  departments: {
    technology: process.env.DEPARTMENT_TECHNOLOGY || '',
    economySocial: process.env.DEPARTMENT_ECONOMY_SOCIAL || ''
  },
  credentials: {
    username: process.env.CREDENTIALS_USERNAME || '',
    password: process.env.CREDENTIALS_PASSWORD || ''
  },
  fetchLength: {
    latestMinus: 2,
    latestPlus: 3
  },
  sizes: {
    rows: [3, 15],
    columns: [1, 7]
  },
  variables: {
    weekOffset: 3,
    port: Number(process.env.SERVER_PORT) || 8085
  },
  connections: {
    secret: process.env.CONNECTION_SECRET || '',
    name: process.env.CONNECTION_NAME || '',
    url: process.env.CONNECTION_URL || '',
    port: process.env.CONNECTION_PORT || ''
  }
}

export default config
