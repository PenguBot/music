"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MusicCommand_1 = require("../lib/structures/MusicCommand");
const Decorators_1 = require("../lib/utils/Decorators");
let default_1 = class extends MusicCommand_1.MusicCommand {
    async run(message) {
        const { music } = message.guild;
        if (music.voiceChannel.members.size > 4) {
            if ("force" in message.flagArgs) {
                if (!music.isMemberDJ(message.member))
                    throw "You can't execute this command with the force flag. You must be a DJ.";
                const response = this.handleSkips(music, message.author.id);
                if (response)
                    return message.send(response);
            }
        }
        const [song] = music.queue;
        await music.skip();
        return message.send(`> 🎧 **Skipped Track:** ${song.title}`);
    }
    handleSkips(musicInterface, user) {
        const [song] = musicInterface.queue;
        if (song.skips.has(user))
            return "You have already voted to skip this song.";
        song.skips.add(user);
        const members = musicInterface.voiceChannel.members.size - 1;
        return this.shouldInhibit(members, song.skips.size);
    }
    shouldInhibit(total, size) {
        if (total <= 3)
            return true;
        return size >= total * 0.4 ? false : `🔸 | Votes: ${size} of ${Math.ceil(total * 0.4)}`;
    }
};
default_1 = __decorate([
    Decorators_1.ApplyOptions({
        aliases: ["skipsong", "repeat"],
        requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
        description: language => language.get("COMMAND_SKIP_DESCRIPTION"),
        music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "VOICE_PLAYING", "BOT_VOICE_CHANNEL"]
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=skip.js.map