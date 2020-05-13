import { Extendable, ExtendableStore, KlasaMessage } from "klasa";
import { Message } from "discord.js";

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, { appliesTo: [KlasaMessage] });
    }

    public async prompt(this: KlasaMessage, content: string, time = 20000): Promise<Message|undefined> {
        await this.channel.send(content);
        const responses = await this.channel.awaitMessages(msg => msg.author === this.author, { time, max: 1 });
        if (responses.size === 0) throw "No responses were made during the given time.";
        return responses.first();
    }

}
