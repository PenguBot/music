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
        async run(message) {
            const { music } = message.guild;
            if (music.queue.length <= 2)
                return message.send(`> 🔃 Queue is too small to shuffle.`);
            music.shuffleQueue();
            return message.send(`🔃 Queue has now been shuffled.`);
        }
        async init() {
            this.disable();
            return Promise.resolve();
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({
            description: "Shuffles the current music queue.",
            aliases: ["shufflequeue", "queueshuffle"],
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "VOICE_PLAYING"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=shuffle.js.map