import { Message, Collection } from "discord.js";
import { SearchResult } from "erela.js";
import { Command } from "../../types/command";

export = {
    name: 'play',
    category: 'Music',
    description: 'play a song',
    aliases: ['p'],
    requiredperms: [],
    reqiredbotperms: [],
    run: async(client, message, args) => {
        if(!message.member.voice.channelId) return message.channel.send('You must join a voice channel!')
        if(!args) return message.channel.send('Give URL or the search term!')

        let player = client.manager.get(message.guild.id) 
        if(!player) {
            player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channelId,
                textChannel: message.channel.id
            })
    
            if(player.state !== "CONNECTED") player.connect();
        }

        const search = args.join(' ')
        let res: SearchResult;

        try {
            res = await player.search(search, message.author);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (err) {
            return message.reply(`there was an error while searching: ${err.message}`);
        }

        switch(res.loadType) {
            case 'NO_MATCHES':
                if(!player.queue.current) player.destroy();
                return message.reply("There's no results found")
            case 'TRACK_LOADED':
                player.queue.add(res.tracks[0])
                if(!player.playing && !player.paused && !player.queue.size) player.play();
                return message.channel.send(`Added to queue ${"`"}${res.tracks[0].title}${"`"}`)
            case 'PLAYLIST_LOADED':
                player.queue.add(res.tracks);

                if(!player.playing && !player.paused && player.queue.totalSize == res.tracks.length) player.play();
                return message.channel.send(`Equeuing playlist ${"`"}${res.playlist.name}${"`"} with ${"`"}${res.tracks.length}${"`"} tracks`)
            case 'SEARCH_RESULT':
                const results = res.tracks
                    .slice(0, 5)
                    .map((track, i) => `${"`"}${++i}. ${track.title}${"`"}`)
                    .join('\n')
                const embed = client.embed({ title: 'Search Results', description: results }).setFooter('Type the number to choose or "end" to end the search')
                const sended = await message.channel.send({ embeds: [embed] })
                sended

                let collector: Collection<string, Message>
                try {
                    const filter = (m: Message) => m.author.id == message.author.id && /^(\d+|end)$/i.test(m.content)
                    collector = await message.channel.awaitMessages({ max: 1, filter: filter, time: 30e3, errors: ['time'] })
                } catch (error) {
                    if (!player.queue.current) player.destroy();
                    sended.delete()
                    return message.channel.send("You havent choose, timeout")
                }

                const first = collector.first().content
                if (first.toLowerCase() === 'end') {
                    if (!player.queue.current) player.destroy();
                    sended.delete()
                    return message.channel.send('Canceled selection');
                }
                
                if(Number(first) > 5) return message.channel.send('Youre giving the number above the limit!')
                player.queue.add(res.tracks[Number(first)-1])

                if(!player.playing && !player.paused && !player.queue.size) player.play();
                collector.first().delete()
                sended.delete()
                return message.channel.send(`Enqueuing ${"`"}${res.tracks[Number(first)-1].title}${"`"}`)

        }

    }
} as Command