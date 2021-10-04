import PrefixModel, { Prefix } from '../models/prefixModel'
import { Event } from '../types/event'

export = {
    name: 'ready',
    run: async(client) => {
        client.logger.success(`Logged in as ${client.user.tag}`)

        client.manager.init(client.user.id)

        // Prefix Config and Database
        PrefixModel.find({}, (err, docs: Prefix[]) => {
            if (err) return console.error('Failed fetch prefix database!')

            client.listPrefix = {};
            docs.forEach(x => {
                client.listPrefix[x.guildId] = x.prefix
            })
        })

        PrefixModel.watch().on('change', change => {
            if(change.operationType == 'insert') client.listPrefix[change.fullDocument['guildId']] = change.fullDocument.prefix;

            if (change.operationType == 'update') {
                PrefixModel.findById(change.documentKey['_id'], (err, docs) => {
                    if (err) {
                        console.error(err)
                    }
                    client.listPrefix[docs.guildId] = docs.prefix
                })
            }

            if (change.operationType == 'delete') {
                PrefixModel.find({}, (err, docs) => {
                    client.listPrefix = {}
                    if (err) {
                        console.error('Erorr fetching prefix config')
                    }
                    docs.forEach(a => {
                        // @ts-ignore
                        client.listPrefix[a.guildId] = a.prefix
                    })
                })
            }
        })
    }
} as Event