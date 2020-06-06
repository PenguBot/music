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
        const toggle = !message.guild.settings.get("toggles.djmode");
        await message.guild.settings.update("toggles.djmode", toggle);
        return message.send(`> **Pengu DJ only mode has been ${toggle ? "Enabled" : "Disabled"}**`);
    }
};
default_1 = __decorate([
    Decorators_1.ApplyOptions({
        description: "Enable or Disable DJ Only Mode.",
        aliases: ["enabledjonly", "disablejonly", "djonly"],
        permissionLevel: 5
    })
], default_1);
exports.default = default_1;
//# sourceMappingURL=toggledj.js.map