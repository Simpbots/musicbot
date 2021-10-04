import { Event } from '../types/event'

export = {
    name: 'raw',
    run: async(client, d) => {
        client.manager.updateVoiceState(d)
    }
} as Event