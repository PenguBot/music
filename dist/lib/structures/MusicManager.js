"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicManager = void 0;
const MusicInterface_1 = require("./MusicInterface");
const discord_js_1 = require("discord.js");
class MusicManager extends discord_js_1.Collection {
    get(keyOrGuild) {
        if (typeof keyOrGuild === "string")
            return super.get(keyOrGuild);
        return super.get(keyOrGuild.id) ?? this.add(keyOrGuild);
    }
    add(guild) {
        if (this.has(guild.id))
            return this.get(guild.id);
        const guildInterface = new MusicInterface_1.MusicInterface(guild);
        this.set(guild.id, guildInterface);
        return guildInterface;
    }
}
exports.MusicManager = MusicManager;
//# sourceMappingURL=MusicManager.js.map