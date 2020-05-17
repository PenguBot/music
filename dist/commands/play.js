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
let default_1 = (() => {
    let default_1 = class extends MusicCommand_1.MusicCommand {
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
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({
            description: "Play Music",
            usage: "<song:song>",
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=play.js.map