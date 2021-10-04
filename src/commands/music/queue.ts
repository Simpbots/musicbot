import { Command } from "../../types/command";

export = {
    name: 'queue',
    category: 'Music',
    description: 'Show the queue',
    aliases: ['q'],
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message, args) => {
        const player = client.manager.get(message.guild.id)
        if(!player) return message.channel.send('Theres no player for this guild')

        const queue = player.queue
        const embed = client.embed({}).setFooter(`Queue in ${message.guild.name}`)

        const multiple = 10
        const page = args.length && Number(args[0]) ? Number(args[0]) : 1

        const end = page * multiple
        const start = end - multiple

        const tracks = queue.slice(start, end)

        if(queue.current) embed.addField("Current", `${"`"}${queue.current.title}${"`"}`)

        if(!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : 'the queue'}`)
        else embed.setDescription(tracks.map((track, i ) => `${start + (++i)} - [${track.title}](${track.uri})`).join('\n'))

        const maxPages = Math.ceil(queue.length / multiple)
        embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`)

        return message.channel.send({ embeds: [embed] })
    }
} as Command