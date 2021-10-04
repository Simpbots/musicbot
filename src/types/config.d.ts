import { ColorResolvable } from 'discord.js'

export interface Config {
    Token: string;
    Prefix: string;
    MONGO_URI: string;
    LAVA_HOST: string;
    LAVA_PORT: number;
    LAVA_PASSWORD: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    Color: ColorResolvable;
}
