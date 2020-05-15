"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const discord_js_1 = require("discord.js");
class default_1 extends klasa_1.Extendable {
    constructor(store, file, directory) {
        super(store, file, directory, { appliesTo: [discord_js_1.Message] });
    }
    async prompt(message, content, time = 30000) {
        await message.channel.send(content);
        const responses = await message.channel.awaitMessages(msg => msg.author === message.author, { time, max: 1 });
        if (responses.size === 0)
            throw "No responses were made during the given time.";
        return responses.first();
    }
}
exports.default = default_1;
//# sourceMappingURL=KlasaMessage.js.map