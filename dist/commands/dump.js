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
const utils_1 = require("../lib/utils/utils");
let default_1 = (() => {
    let default_1 = class extends MusicCommand_1.MusicCommand {
        async run(message) {
            const { music } = message.guild;
            const save = await utils_1.dump(JSON.stringify(music.queue));
            return message.channel.send(`> 📁 **The queue is saved:** <${save}>\n> Future usage: \`p!play <the url above>\` to play later!`);
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({
            description: "Save current queue in a link for later use.",
            aliases: ["savesongs", "save"],
            music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "USER_VOICE_CHANNEL", "COMMON_VOICE_CHANNEL"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=dump.js.map