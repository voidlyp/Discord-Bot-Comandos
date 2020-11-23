const discord = require('discord.js')
const config = require('../config.json')

module.exports.run = (bot, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Vc nao tem permissao!')

    let splitarg = args.join(" ").split(" ")

    let title = splitarg[0];
    let anuncio = splitarg[1];
    let channel = splitarg[2];

    if (!title || !anuncio || !channel) {
        return message.channel.send(new discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`${message.author} > ${config.prefix}anunciar <titulo> <anuncio> <id do canal>`)
        )
    }

    bot.channels.cache.get(channel).send(new discord.MessageEmbed()
        .setColor('YELLOW')
        .setTitle(title)
        .setDescription(anuncio)
        .setFooter(`Anuncio enviado por: ${message.author.username}`)
    )


}

module.exports.config = {
    name: "anunciar",
    aliases: ['avisar']
}