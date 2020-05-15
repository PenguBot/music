"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicCommand_1 = require("../lib/structures/MusicCommand");
class default_1 extends MusicCommand_1.MusicCommand {
    constructor(store, file, directory) {
        super(store, file, directory, {
            description: "Play Music",
            usage: "<song:song>",
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION"]
        });
    }
    async run(message, [song]) {
        var _a, _b;
        const { music } = message.guild;
        if (!song.tracks.length)
            throw "The track could not be found or loaded.";
        if (!music.voiceChannel && ((_a = message.member) === null || _a === void 0 ? void 0 : _a.voice.channel))
            await music.join((_b = message.member) === null || _b === void 0 ? void 0 : _b.voice.channel.id);
        music.setTextChannel(message.channel.id);
        music.add(message.author, song);
        if (!music.playing)
            await music.play();
    }
}
exports.default = default_1;
//# sourceMappingURL=play.js.map