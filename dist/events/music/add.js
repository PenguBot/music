"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const Decorators_1 = require("../../lib/utils/Decorators");
let default_1 = (() => {
    let default_1 = class extends klasa_1.Event {
        async run(guild, songs, trackres) {
            const { music } = guild;
            if (trackres.playlistInfo.name) {
                await music.textChannel.send(`> **${songs.length} songs** from the playlist **${trackres.playlistInfo.name}** have been added to the queue.`);
                return;
            }
            if (music.queue.length < 2)
                return;
            const [song] = songs;
            const addString = ["> 🗒️ __**Added To Queue:**__",
                `**Title:** ${song.title}`,
                `**Author:** ${song.author}`,
                `**Length:** ${song.friendlyDuration}`,
                `**Requested By:** ${song.requester}`,
                `**Link:** <${song.url}>`];
            await music.textChannel.send(addString.join("\n> "));
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({ name: "musicAdd" })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=add.js.map