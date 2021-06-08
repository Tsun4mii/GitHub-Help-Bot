const Discord = require('discord.js')
const fs = require('fs')
const Octokit = require("@octokit/core")
const fetch = require('node-fetch')

module.exports.run = async(client, message, args, prefix) =>
{
    const response = await fetch('https://api.github.com/users/' + args[0]);
    if(typeof response == "undefined")
    {
        const Embed = new Discord.MessageEmbed()
        .addField('Error message', res.message, false)
        message.channel.send(Embed);
    }
    else{
        res = await response.json();
        let dateObj = new Date(res.updated_at);
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let newdate = year + "/" + month + "/" + day;

        const Embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('I found info about this user')
        .setThumbnail(res.avatar_url)
        .setURL(res.html_url)
        .addFields(
            {name: 'Login', value: res.login, inline: true}
        )
        .addField('Bio', res.bio, false)
        .addFields(
            { name: 'Name', value: res.name, inline: false},
            { name: 'Follovers', value: res.followers, inline: true},
            { name: 'Folloving', value: res.following, inline: true},
        )
        .addFields(
            {name: 'Public repos', value: res.public_repos, inline: false},
            {name: 'Last update', value: newdate, inline: false}
        );

        message.channel.send(Embed);
    }
};
module.exports.help = {
    name: "UserInfo"
};
