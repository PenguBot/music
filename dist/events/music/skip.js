"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild, skipper) {
        const { music } = guild;
        const [song] = music.queue;
        if (music.looping)
            return music.textChannel.send(`> Music is currently looping, unable to skip.`);
        if (song.skips.has(skipper))
            return music.textChannel.send(`> ${skipper} you have already voted to skip this song.`);
        song.skips.add(skipper);
        const members = music.voiceChannel.members.size - 1;
        const countString = song.skips.size >= members * 0.4 ? false : `> 🔸 | Votes: ${song.skips.size} of ${Math.ceil(members * 0.4)}`;
        if (countString) {
            return music.textChannel.send(countString);
        }
        else {
            await music.skip();
            return music.textChannel.send(`> **${song.title}** was skipped by ${skipper}.`);
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=skip.js.map