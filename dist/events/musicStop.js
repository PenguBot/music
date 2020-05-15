"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild) {
        const { music } = guild;
        await music.destroy();
        await music.textChannel.send("> ⏹️ Queue has finished playing, stopping music and leaving voice channel!");
    }
}
exports.default = default_1;
//# sourceMappingURL=musicStop.js.map