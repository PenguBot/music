import { Extendable, ExtendableStore } from "klasa";
import { Message } from "discord.js";
export default class extends Extendable {
    constructor(store: ExtendableStore, file: string[], directory: string);
    prompt(message: Message, content: string, time?: number): Promise<Message | undefined>;
}
