"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild) {
        var _a;
        const { music } = guild;
        if (!music.looping) {
            const [song] = music.queue;
            await ((_a = music.textChannel) === null || _a === void 0 ? void 0 : _a.send(`> ▶️ **Now Playing:** ${song.title} - ${song.author} (<${song.url}>) | **Requested By:** ${song.requester}`));
            music.queue.shift();
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=musicPlayEvent.js.map