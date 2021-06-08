const Discord = require('discord.js')
const fs = require('fs')
const Octokit = require("@octokit/core")
const fetch = require('node-fetch')

module.exports.run = async(client, message, args, prefix) =>
{
    const response = await fetch(`https://api.github.com/users/${args[0]}/repos`);
    if(typeof response == "undefined")
    {
        const Embed = new Discord.MessageEmbed()
        .addField('Error message', res.message, false)
        message.channel.send(Embed);
    }
    else{
        res = await response.json();

        const Embed = new Discord.MessageEmbed();
        res.forEach(i => {
            Embed.addField(i.name, i.html_url)
        });
        
        message.channel.send(Embed);
    }
};
module.exports.help = {
    name: "GetRepos"
};