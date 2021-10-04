import { Command } from "../../types/command";

export = {
    name: 'help',
    category: 'Utility',
    description: 'Giving informations abaout available commands',
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message) => {
        const commandcategory = {}
        client.commands.forEach(x => {
            commandcategory[x.category] = client.commands.filter(e => e.category == x.category)
        })

        const prefix = client.listPrefix[message.guild.id] || client.Config.Prefix
        const commandList = Object.keys(commandcategory).map(x => (
            `**${x} commands**\n ${commandcategory[x].map(e => {
                if(!prefix.split(' ')) return `${'`'}${prefix} ${e.name}${'`'}`
                else return `${'`'}${prefix}${e.name}${'`'}`
            }).join('\n')}`
        ))

        const embed = client.embed({ title: "Help", description: "Here's command you can use:\n\n" + commandList.join('\n\n') })
        return message.channel.send({ embeds: [embed] })
    }
} as Command