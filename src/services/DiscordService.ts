import * as Discord from 'discord.io'

import config from '../config'

export const bot = new Discord.Client({
  token: config.discordAuth,
  autorun: true
})

bot.on('message', function (user, userID, channelID, message, evt) {
  if (message.substring(0, 1) === '!') {
    let args = message.substring(1).split(' ');
    const cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      case 'test':
        bot.sendMessage({
          to: channelID,
          message: 'Pong!'
        })
        break
    }
  }
});