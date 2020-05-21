import { Structures } from "discord.js";

Structures.extend("Message", M => {
    class Message extends M {

        public async prompt(content: string, time = 30000): Promise<Message|undefined> {
            await this.send(content);
            const responses = await this.channel.awaitMessages(msg => msg.author === this.author, { time, max: 1 });
            if (responses.size === 0) throw "No responses were made during the given time.";
            return responses.first();
        }

    }
    return Message;
});

declare module "discord.js" {
    interface Message {
        prompt(content: string, time?: number): Promise<Message|undefined>;
    }
}
