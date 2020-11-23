const Discord = require('discord.js')

module.exports.run = (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Vc nao tem permissao!')

    if (args[0]) {
        message.channel.send(args[0])
    } else {
        message.channel.send(new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`${message.author} > Você não colocou a mensagem!`)
        )
    }

}

module.exports.config = {
    name: "say",
    aliases: ['falar']
}