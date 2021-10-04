import { Client, Intents, Collection, MessageEmbed, MessageEmbedOptions } from 'discord.js'
import glob from 'glob'
import consola, { Consola } from 'consola'
import { promisify } from 'util'
import { Command } from './types/command'
import { Event } from './types/event'
import { Config } from './types/config'
import mongoose from 'mongoose'
import { Manager } from 'erela.js'
import Spotify from 'erela.js-spotify'

class Bot extends Client {
    public globPromise = promisify(glob)
    public listPrefix: object = {}
    public logger: Consola = consola
    public Config: Config
    public commands: Collection<string, Command> = new Collection()
    public events: Collection<string, Event> = new Collection()
    public manager: Manager

    public constructor() {
        super({ intents: Object.values(Intents.FLAGS).reduce((acc, p) => acc | p, 0), shards: 'auto' })
    }

    public async start(config: Config): Promise<any> {
        this.Config = config
        this.login(config.Token)

        await mongoose.connect(config.MONGO_URI)
            .then(() => this.logger.success('Success connect to database'))
        
        const commandFiles: string[] = await this.globPromise(`${__dirname}/commands/**/*{.ts,.js}`)
        console.log('=== COMMANDS ===')
        commandFiles.map(async(x: string) => {
            const file: Command = await import(x)
            this.commands.set(file.name, file)
            this.logger.info(`Success load command: ${file.name}`)  
        })
        
        const eventFiles: string[] = await this.globPromise(`${__dirname}/events/*{.ts,.js}`)
        console.log('=== EVENTS ===')
        eventFiles.map(async(x: string) => {
            const file: Event = await import(x)
            this.events.set(file.name, file)
            this.on(file.name, file.run.bind(null, this))
            this.logger.info(`Success load event: ${file.name}`)  
        })

        const client = this;
        this.manager = new Manager({
            nodes: [{
                host: config.LAVA_HOST,
                port: config.LAVA_PORT,
                password: config.LAVA_PASSWORD,
                retryDelay: 1000,
                retryAmount: 100
            }],

            plugins: [
                new Spotify({ clientID: config.SPOTIFY_CLIENT_ID, clientSecret: config.SPOTIFY_CLIENT_SECRET })
            ],

            send(id, payload) {
                const guild = client.guilds.cache.get(id)
                if(guild) guild.shard.send(payload)
            }
        })


        this.manager.on('nodeConnect', node => this.logger.success(`Node "${node.options.identifier}" connected`))
        this.manager.on('nodeError', (node, error) => this.logger.log(`Node "${node.options.identifier}" encoutered an error: ${error}`))
    }

    public embed(options: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed({ ...options, color: this.Config.Color }).setTimestamp().setFooter(this.user.username)
    }
}

export { Bot }
