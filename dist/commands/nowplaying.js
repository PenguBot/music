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
        const [song] = music.queue;
        const playString = [
            "> ▶️ __**Now Playing:**__",
            `**Title:** ${song.title}`,
            `**Author:** ${song.author}`,
            `**Length:** ${song.stream ? "Live Stream" : music.currentTimeString}`,
            `**Requested By:** ${song.requester.username}#${song.requester.tag}`,
            `**Link:** <${song.url}>`
        ];
        if (message.flagArgs.dm)
            return message.author.send(playString.join("\n")).catch(() => null);
        return message.send(playString.join("\n> "));
    }
};
default_1 = __decorate([
    Decorators_1.ApplyOptions({
        description: "Get the current playing song's information.",
        aliases: ["np", "currentlyplaying", "dmsong", "savesong"],
        music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "VOICE_PLAYING"]
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=nowplaying.js.map