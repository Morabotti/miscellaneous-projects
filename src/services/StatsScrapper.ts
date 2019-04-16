import * as request from 'request'
import * as cheerio from 'cheerio'

import config from '../config'
import { setData, getData } from './LocalService'

export const init = async () => {
  console.log('[SCRAPE]: Init started')
  const data = await scrape()
  await setData(data)
}

export const routineScrape = async () => {
  const oldData = await getData()
  const newData = await scrape()

  let outputData: any[] = []
  Object.keys(newData).forEach(i => {
    const { server, players, type } = newData[i]
    outputData.push({
      server,
      players,
      type,
      diff: players - oldData[i].players
    })
  })
  await setData(newData)
  return outputData
}

const scrape = () => {
  return new Promise((resolve, reject) => {
    request(config.scrapeSource, async (err, response, html) => {
      if (!err) {
        const $ = await cheerio.load(html)
        const serverList = await $('table.server-list tbody.server-list__body').children()
        let servers: any[] = []
        
        serverList.each((i, val) => {
          const children = $(val).children()
          const server =  $(children).eq(0).children().eq(0).text()
          const players = $(children).eq(1).text()
          const type = $(children).eq(3).text()

          servers.push({
            server: server.split(' ').pop(),
            players: Number(players.substr(0, players.indexOf(' '))),
            type: type
          })
        })
        resolve(servers)
      } else {
        reject()
      }
    })
  })
}
