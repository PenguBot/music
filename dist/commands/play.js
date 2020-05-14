"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Command {
    constructor(store, file, directory) {
        super(store, file, directory, {
            description: "Play Music",
            usage: "<song:song>"
        });
    }
    async run(message, [song]) {
        var _a, _b;
        const { music } = message.guild;
        if (!song.tracks.length)
            throw "The track could not be found or loaded.";
        if (!music.voiceChannel && ((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
            await music.join((_b = message.member) === null || _b === void 0 ? void 0 : _b.voice.channel.id);
        music.add(message.author, song);
        music.textChannelID = message.channel.id;
        if (!music.playing)
            await music.play();
    }
}
exports.default = default_1;
//# sourceMappingURL=play.js.map