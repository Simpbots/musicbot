import { Message, MessageEmbed } from 'discord.js'
import { Command } from '../types/command'
import { Event } from '../types/event'

export = {
    name: 'messageCreate',
    run: async (client, message: Message) => {
        if(message.author.bot || !message.guild) return

        const prefix = client.listPrefix[message.guild.id] || client.Config.Prefix 

        if(message.content == `<@!${client.user.id}>`) return message.channel.send(`My prefix is ${"`"}${prefix}${"`"}`);

        if(!message.content.startsWith(prefix)) return
        const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmd: string = args.shift()

        const command: Command = client.commands.get(cmd) || client.commands.find(x => x.aliases && x.aliases.includes(cmd))
        if(!command) return
        if(!message.guild.me.permissions.has(command.reqiredbotperms)) return message.reply('Bot doesnt have enough permission!')
        if(!message.member.permissions.has(command.requiredperms)) return message.reply('You dont have enough permission!')

        command.run(client, message, args).catch((reason: any) => {
            const errorEmbed = new MessageEmbed({
                title: "Error has occure",
                description: `${'```'}${String(reason)}${'```'}`,
                color: 'RED'
            })

            message.channel.send({ embeds: [errorEmbed] })
            console.error(reason)
        })
    }  
} as Event