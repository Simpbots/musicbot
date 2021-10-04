import { Bot } from '../client'
import { ClientEvents } from 'discord.js'

export interface RunFunction {
    (client: Bot, ...args: any[]): Promise<T>
}

export interface Event {
    name: string;
    run: RunFunction;
}
