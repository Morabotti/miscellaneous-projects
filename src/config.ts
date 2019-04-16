import * as dotenv from 'dotenv'

dotenv.config()

interface ConfigType {
  port: number,
  scrapeSource: string,
  scrapeUpdate: number,
  scrapeDiff: number,
  discordAuth: string,
  dbServersPath: string
}

const config: ConfigType = {
  'port': Number(process.env.SERVER_PORT) || 8080,
  'scrapeSource': process.env.SCRAPE_SOURCE || 'http://oldschool.runescape.com/slu.ws?order=WMLPA',
  'scrapeUpdate': Number(process.env.SCRAPE_UPDATE) || 5,
  'scrapeDiff': Number(process.env.SCRAPE_DIFFERENCE) || 20,
  'discordAuth': process.env.DISCORD_AUTH || 'secret',
  'dbServersPath': process.env.DB_SERVERS_PATH || './db/servers.json'
}

export default config
