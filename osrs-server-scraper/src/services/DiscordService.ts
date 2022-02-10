import * as Discord from 'discord.io'

import config from '../config'

let channel: string | null = null

export const bot = new Discord.Client({
  token: config.discordAuth,
  autorun: true
})

export const sendWarning = (
  server: string,
  players: number,
  difference: number
) => {
  console.log(`[EVENT]: Server ${server} peaked ${difference} difference`)
  if(channel === null) return
  bot.sendMessage({
    to: channel,
    message: `**SERVER ${server}** just had **${difference}** difference with **${players}** players!`
  })
}

bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 1) === '!') {
    let args = message.substring(1).split(' ')
    const cmd = args[0]

    args = args.splice(1)
    switch (cmd) {
      case 'osrs-updates':
        channel = channelID
        console.log(`[BOT]: Server set to ${channel}`)
        bot.sendMessage({
          to: channelID,
          message: '**CHANNEL SET**'
        })
        break
    }
  }
})
