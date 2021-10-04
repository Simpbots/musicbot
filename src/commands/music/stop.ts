import { Command } from "../../types/command";

export = {
    name: 'stop',
    category: 'Music',
    description: 'stop played song',
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message, _args) => {
        const player = client.manager.get(message.guild.id)
        if(!player) return message.channel.send('Theres no player for this guild')

        if(!message.member.voice.channelId) return message.channel.send("You're not in a voice channel")
        if(message.member.voice.channelId !== player.voiceChannel)  return message.channel.send("You're not in the same channel")
        
        player.destroy()
        return message.channel.send('Player was destroyed')

    }
} as Command