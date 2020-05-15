"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild) {
        const { music } = guild;
        if (!music.looping) {
            const [song] = music.queue;
            await music.textChannel.send(`> ▶️ **Now Playing:** ${song.title} - ${song.author} (<${song.url}>) | **Requested By:** ${song.requester}`);
            music.queue.shift();
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=musicPlay.js.map