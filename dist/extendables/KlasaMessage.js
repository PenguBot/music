"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Extendable {
    constructor(store, file, directory) {
        super(store, file, directory, { appliesTo: [klasa_1.KlasaMessage] });
    }
    async prompt(content, time = 20000) {
        await this.channel.send(content);
        const responses = await this.channel.awaitMessages(msg => msg.author === this.author, { time, max: 1 });
        if (responses.size === 0)
            throw "No responses were made during the given time.";
        return responses.first();
    }
}
exports.default = default_1;
//# sourceMappingURL=KlasaMessage.js.map