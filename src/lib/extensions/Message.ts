import { Structures } from "discord.js";

Structures.extend("Message", M => {
    class Message extends M {

        public async prompt(message: Message, content: string, time = 30000): Promise<Message|undefined> {
            await message.channel.send(content);
            const responses = await message.channel.awaitMessages(msg => msg.author === message.author, { time, max: 1 });
            if (responses.size === 0) throw "No responses were made during the given time.";
            return responses.first();
        }

    }
    return Message;
});

declare module "discord.js" {
    interface Message {
        prompt(message: Message, content: string, time?: number): Promise<Message|undefined>;
    }
}
