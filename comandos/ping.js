module.exports.run = (bot, message, args) => {
    message.channel.send(`Pong! **${message.createdTimestamp}**ms`)
}

module.exports.config = {
    name: "ping",
    aliases: ['p']
}