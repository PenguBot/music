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
        async run(music, skipper) {
            const [song] = music.queue;
            if (music.looping)
                return music.textChannel.send(`> 🔴 Music is currently looping, unable to skip.`);
            if (song.skips.has(skipper))
                return music.textChannel.send(`> ${skipper} you have already voted to skip this song.`);
            song.skips.add(skipper);
            const members = music.voiceChannel.members.size - 1;
            const countString = song.skips.size >= members * 0.4 ? false : `> 🔸 | Votes: ${song.skips.size} of ${Math.ceil(members * 0.4)}`;
            if (countString) {
                return music.textChannel.send(countString);
            }
            else {
                await music.skip();
                return music.textChannel.send(`> **${song.title}** was skipped by ${skipper}.`);
            }
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({ name: "musicSkip" })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=skip.js.map