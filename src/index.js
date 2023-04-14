require('dotenv').config();
const { Client, IntentsBitField, Collection } = require('discord.js');
const fs = require('fs');
const Levels = require('discord-xp');
const client = new Client({ intents: [IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessages] })

client.commands = new Collection();

const functions = fs.readdirSync('./src/functions').filter(f => f.endsWith('.js'))

functions.forEach(func => {
    require(`./functions/${func}`)(client)
})

Levels.setURL(process.env.mongo_uri)

client.login(process.env.token)