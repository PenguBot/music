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
        const { music } = message.guild;
        if (!message.member)
            await message.guild.members.fetch(message.author.id);
        if (!music.voiceChannel && message.member.voice.channel)
            await music.join(message.member.voice.channel.id);
        music["textChannel"] = message.channel;
        music.add(message.author, song);
        if (!music.playing)
            await music.play();
    }
}
exports.default = default_1;
//# sourceMappingURL=play.js.map