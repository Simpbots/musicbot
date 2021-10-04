import { Command } from "../../types/command";

export = {
    name: 'skip',
    category: 'Music',
    description: 'skip played song',
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message, _args) => {
        const player = client.manager.get(message.guild.id)
        if(!player) return message.channel.send('Theres no player for this guild')

        if(!message.member.voice.channelId) return message.channel.send("You're not in a voice channel")
        if(message.member.voice.channelId !== player.voiceChannel)  return message.channel.send("You're not in the same channel")
        
        if(!player.queue.current) return message.channel.send("Theres no music playing")

        const { title } = player.queue.current

        player.stop()
        return message.channel.send(`${"`"}${title}${"`"} was skkiped`)

    }
} as Command