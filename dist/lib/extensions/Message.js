"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
discord_js_1.Structures.extend("Message", M => {
    class Message extends M {
        async prompt(message, content, time = 30000) {
            await message.send(content);
            const responses = await message.channel.awaitMessages(msg => msg.author === message.author, { time, max: 1 });
            if (responses.size === 0)
                throw "No responses were made during the given time.";
            return responses.first();
        }
    }
    return Message;
});
//# sourceMappingURL=Message.js.map