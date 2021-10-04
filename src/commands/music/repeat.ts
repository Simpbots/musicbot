import { Command } from "../../types/command";

export = {
    name: 'repeat',
    category: 'Music',
    description: 'Repeat queue',
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message, args) => {
        const player = client.manager.get(message.guild.id)
        if(!player) return message.channel.send('Theres no player for this guild')

        if(!message.member.voice.channelId) return message.channel.send("You're not in a voice channel")
        if(message.member.voice.channelId !== player.voiceChannel)  return message.channel.send("You're not in the same channel")
        
        if(args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat)
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
            return message.channel.send(`${queueRepeat} queue repeat`)
        }

        player.setTrackRepeat(!player.trackRepeat)
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled"

        return message.channel.send(`${trackRepeat} track repeat`)
    }
} as Command