import { Command } from "../../types/command";

export = {
    name: 'join',
    category: 'Music',
    description: 'Join the voice channel',
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message) => {
        if(!message.member.voice.channelId) return message.channel.send('You must join a voice channel!')

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channelId,
            textChannel: message.channel.id
        })

        if(player.state !== "CONNECTED") player.connect();

        return message.channel.send('Success join the voice channel')
    }
} as Command