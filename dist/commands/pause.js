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
        await music.pause();
        return message.send(`> ⏯️ Music is now **${!music.paused ? "Playing" : "Paused"}.**`);
    }
};
default_1 = __decorate([
    Decorators_1.ApplyOptions({
        description: "Pause or Resume Music.",
        aliases: ["resume", "togglepause"],
        music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "BOT_VOICE_CHANNEL"]
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=pause.js.map