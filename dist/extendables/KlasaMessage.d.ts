import { Extendable, ExtendableStore, KlasaMessage } from "klasa";
import { Message } from "discord.js";
export default class extends Extendable {
    constructor(store: ExtendableStore, file: string[], directory: string);
    prompt(this: KlasaMessage, content: string, time?: number): Promise<Message | undefined>;
}
