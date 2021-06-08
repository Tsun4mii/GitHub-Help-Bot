const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const config = require('./config.json')
const fetch = require('node-fetch')
client.commands = new Discord.Collection()

fs.readdir('./commands', (err, files) => {
    if(err)
    { 
        console.log(err);
    }

    let jsfile = files.filter(f => f.split('.').pop() === 'js')
    if (jsfile.length <= 0) return console.log('No commands found')

    jsfile.forEach((f, i) => { 
        let props = require(`./commands/${f}`)
        client.commands.set(props.help.name, props)
    })
})

client.on('ready', ()=>{
    client.user.setActivity("with JavaScript")
})

client.on('message', message => {
    let prefix = config.prefix
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let messageArray = message.content.split(' ')
    let command = messageArray[0]
    let args = messageArray.slice(1)

    let command_file = client.commands.get(command.slice(prefix.length))
    if(command_file ) command_file.run(client, message, args, prefix)
})

client.login(config.token)