import { Bot } from '../client'
import { Message, PermissionResolvable } from 'discord.js'

export interface RunFunction {
    (client: Bot, message: Message, args: any[]): Promise<T>
}

export interface Command {
    name: string;
    aliases?: string[];
    description: string;
    category: string;
    longdescription?: string;
    requiredperms: PermissionResolvable[];
    reqiredbotperms: PermissionResolvable[];
    run: RunFunction;
}
