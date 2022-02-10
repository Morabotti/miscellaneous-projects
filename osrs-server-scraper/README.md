# OSRS Server scrapper with discord bot integration

Environment variables:
```
SERVER_PORT=8080
SCRAPE_SOURCE='http://oldschool.runescape.com/slu.ws?order=WMLPA'
SCRAPE_UPDATE=5
SCRAPE_DIFFERENCE=20
DISCORD_AUTH='NTY3NzQzNzA3MzkxMDY2MTIy.NTY3NzQzNzA3MzkxMDY2MTIy.NTY3NzQzNzA3MzkxMDY2MTIy'
DB_SERVERS_PATH='./db/servers.json'
```

DISCORD_AUTH=Bot token

## Installation

1. Clone this repo
2. Create discord bot (Link down below)
3. Rename `.env.example` to `.env` and change the variables to your needs
4. Run `npm install`
5. Run `npm run build`
6. Run `npm run production`

## How to use

1. When you have added the bot, type `!osrs-updates` to any channel
NOTE: There is no auth so anybody can type that. Pref that only admins can write to this channel
2. When the difference goes over `SCRAPE_DIFFERENCE`, application sends message to discord.

## How to create discord bot

[Here is a guide for creating discod bot](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/)
(You only need first 4 steps)

[Discord developer portal](https://discordapp.com/developers/applications)