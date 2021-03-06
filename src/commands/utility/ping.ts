import { Command } from "../../types/command";

export = {
    name: 'ping',
    description: 'Giving inforamtion about bot latency',
    requiredperms: [],
    reqiredbotperms: [],
    category: 'Utility',
    run: async (client, message) => {
        return message.channel.send('Pinging....')
            .then(sended => {
                sended.edit({ embeds: [client.embed({ title: `ā Roundtrip latency: ${sended.createdTimestamp - message.createdTimestamp}ms\nā WebSocket: ${client.ws.ping}ms` })] })
            })
    }
} as Command