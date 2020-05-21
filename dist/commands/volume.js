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
        async run(message, [volume]) {
            const { music } = message.guild;
            if (!volume)
                return message.send(`> 🔈 **Current player volume is:** ${music.volume}`);
            if (volume < 1 || volume > 150)
                return message.send(`> 🔈 **Volume can not be lower than 1 or higher than 150.**`);
            await music.setVolume(volume);
            return message.send(`> 🔈 **Volume has now been updated to:** ${volume}`);
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({
            usage: "[volume:integer]",
            description: language => language.get("COMMAND_VOLUME_DESCRIPTION"),
            aliases: ["changevol", "setvolume", "changevolume"],
            music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "VOICE_PLAYING", "USER_VOICE_CHANNEL", "COMMON_VOICE_CHANNEL", "DJ_MEMBER"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=volume.js.map