import { Extendable, ExtendableStore } from "klasa";
import { Message } from "discord.js";

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, { appliesTo: [Message] });
    }

    public async prompt(message: Message, content: string, time = 30000): Promise<Message|undefined> {
        await message.channel.send(content);
        const responses = await message.channel.awaitMessages(msg => msg.author === message.author, { time, max: 1 });
        if (responses.size === 0) throw "No responses were made during the given time.";
        return responses.first();
    }

}
