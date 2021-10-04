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
                sended.edit({ embeds: [client.embed({ title: `✅ Roundtrip latency: ${sended.createdTimestamp - message.createdTimestamp}ms\n✅ WebSocket: ${client.ws.ping}ms` })] })
            })
    }
} as Command