import PrefixModel, { Prefix } from "../../models/prefixModel";
import { Command } from "../../types/command";

export = {
    name: 'setprefix',
    description: 'Set the guild prefix',
    requiredperms: ['ADMINISTRATOR'],
    reqiredbotperms: [],
    category: 'Utility',
    run: async (client, message, args) => {
       if(!Object.keys(client.listPrefix).includes(message.guild.id)) {
           new PrefixModel({ prefix: String(args[0]), guildId: message.guild.id } as Prefix).save()
            .then(() => {
                return message.channel.send(`Success change prefix to ${"`"}${String(args[0])}${"`"}`)
            })
            .catch(err => {
                console.error(err)
                return message.channel.send('Failed set prefix')
            })
       } else {
           PrefixModel.updateOne({ guildId: message.guild.id }, { prefix: String(args[0]) })
            .then(() => {
                return message.channel.send(`Success change prefix to ${"`"}${String(args[0])}${"`"}`)
            })
            .catch(err => {
                console.error(err)
                return message.channel.send('Failed set prefix')
            })
       }
    }
} as Command