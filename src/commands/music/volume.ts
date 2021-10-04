import { Command } from "../../types/command";

export = {
    name: 'volume',
    category: 'Music',
    aliases: ['v'],
    description: 'Change volume of the music',
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message, args) => {
        const player = client.manager.get(message.guild.id)
        if(!player) return message.channel.send('Theres no player for this guild')

        if(!message.member.voice.channelId) return message.channel.send("You're not in a voice channel")
        if(message.member.voice.channelId !== player.voiceChannel)  return message.channel.send("You're not in the same channel")
        
        if(!/^(\d+|end)$/i.test(args[0]) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send("Must be valid number between 1 and 100")

        const volume = Number(args[0])
        
        player.setVolume(volume)
        return message.channel.send(`Set the player to ${volume}`)
    }
} as Command