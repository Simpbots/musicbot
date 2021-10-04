import { Command } from "../../types/command";

export = {
    name: 'resume',
    category: 'Music',
    description: 'resume a paused song',
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message, _args) => {
        const player = client.manager.get(message.guild.id)
        if(!player) return message.channel.send('Theres no player for this guild')

        if(!message.member.voice.channelId) return message.channel.send("You're not in a voice channel")
        if(message.member.voice.channelId !== player.voiceChannel)  return message.channel.send("You're not in the same channel")
        if(player.paused) {
            player.pause(false)
            return message.channel.send("Resume paused music")
        }

        return message.channel.send("The music not paused")
    }
} as Command