const Discord = require('discord.js')
const bot = new Discord.Client()
const config = require('./config.json')
const fs = require('fs')

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./comandos/", (err, files) => {
    if (err) return console.log(`Error: ${err}`)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) return console.log('Nenhum comando encontrado')
    jsfile.forEach((f, i) => {
        let pull = require(`./comandos/${f}`)
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("ready", () => {
    console.log('Bot ligado com sucesso ' + bot.user.tag)
    bot.user.setActivity('Deixa o Likão e Inscreva-se')
})

bot.on("message", message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    var prefix = config.prefix;

    if (!message.content.startsWith(prefix)) return

    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let comando = args.shift().toLowerCase()

    const commandFile = bot.commands.get(comando) || bot.commands.get(bot.aliases.get(comando))
    if (commandFile) commandFile.run(bot, message, args)

})

bot.on("guildMemberAdd", member => {

    bot.channels.cache.get("696912176501227700").send(new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Bem-Vindo(a) ao servidor ${member.guild.name}`)
    )

    member.roles.add("696911759608381491")

})

bot.on("guildMemberRemove", member => {

    bot.channels.cache.get("696912176501227700").send(new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setAuthor(member.user.username, member.user.avatarURL())
        .setDescription(`Saiu do servidor ${member.guild.name}\nAgora estamos com ${member.guild.memberCount} Membros!`)
    )

})

bot.login(config.token)