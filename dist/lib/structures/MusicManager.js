"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicManager = void 0;
const MusicInterface_1 = require("./MusicInterface");
const klasa_1 = require("klasa");
const discord_js_1 = require("discord.js");
class MusicManager extends discord_js_1.Collection {
    get(keyOrGuild) {
        var _a;
        if (typeof keyOrGuild === "string")
            return super.get(keyOrGuild);
        return (_a = super.get(keyOrGuild.id)) !== null && _a !== void 0 ? _a : this.add(keyOrGuild);
    }
    add(guild) {
        if (!(guild instanceof klasa_1.KlasaGuild))
            throw "Guild must be an instance of Guild.";
        if (this.has(guild.id))
            return this.get(guild.id);
        const guildInterface = new MusicInterface_1.MusicInterface(guild);
        this.set(guild.id, guildInterface);
        return guildInterface;
    }
}
exports.MusicManager = MusicManager;
//# sourceMappingURL=MusicManager.js.map