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
        async run(message, [songOrQueue = "song"]) {
            const { music } = message.guild;
            if (songOrQueue === "song") {
                music.looping = !music.looping;
                await message.channel.send(`> 🔄 Music is now **${music.looping ? "" : "No Longer"} Looping** in **Song** mode.`);
                return;
            }
            music.queue = music.queue.concat(music.queue);
            return message.channel.send(`> 🔄 Music is now **Looping** in **Queue** mode.`);
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({
            description: "Loop the current song or queue.",
            usage: "[song|queue]",
            aliases: ["repeat", "loopsong"],
            music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "VOICE_PLAYING", "USER_VOICE_CHANNEL", "COMMON_VOICE_CHANNEL", "DJ_MEMBER"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=loop.js.map