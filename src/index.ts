import { Bot } from './client'
import { Config } from './types/config'
import { ColorResolvable } from "discord.js"
import dotenv from 'dotenv'
dotenv.config()

const config: Config = {
    Token: process.env['TOKEN'],
    Prefix: process.env['PREFIX'],
    MONGO_URI: process.env['MONGO_URI'],
    LAVA_HOST : process.env['LAVA_HOST'],
    LAVA_PORT : Number(process.env['LAVA_PORT']),
    LAVA_PASSWORD : process.env['LAVA_PASSWORD'],
    Color: process.env['COLOR'] as ColorResolvable,
    SPOTIFY_CLIENT_ID: process.env['SPOTIFY_CLIENT_ID'],
    SPOTIFY_CLIENT_SECRET: process.env['SPOTIFY_CLIENT_SECRET']
}

new Bot().start(config)