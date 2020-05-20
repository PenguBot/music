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
        async run(music) {
            await music.textChannel.send("> ⏹️ Queue has finished playing, stopping music and leaving voice channel!");
            await music.destroy();
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({ name: "musicStop" })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=stop.js.map