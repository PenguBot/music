"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild) {
        const { music } = guild;
        if (!music.looping) {
            const [song] = music.queue;
            const playString = ["> ▶️ **Now Playing:**",
                `> **Title:** ${song.title}`,
                `> **Author:** ${song.author}`,
                `> **Length:** ${song.friendlyDuration}`,
                `> **Requested By:** ${song.requester}`,
                `> **Link:** <${song.url}>`];
            await music.textChannel.send(playString.join("\n"));
            music.queue.shift();
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=musicPlay.js.map