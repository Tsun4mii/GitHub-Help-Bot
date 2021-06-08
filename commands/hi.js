const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async(client, message, args, prefix) =>
{
    message.channel.send("Hello there");
};
module.exports.help = {
    name: "hi"
};