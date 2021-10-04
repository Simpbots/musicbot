import { Schema, model } from 'mongoose'

interface Prefix {
    prefix?: string;
    guildId: string;
}

const schema = new Schema<Prefix>({
    prefix: { type : String, required: true },
    guildId: { type : String, required: true }
})

const PrefixModel = model<Prefix>('Prefix', schema)

export default PrefixModel
export { Prefix }
