"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicInterface_1 = require("./MusicInterface");
const discord_js_1 = require("discord.js");
class MusicManager extends discord_js_1.Collection {
    get(keyOrGuild) {
        var _a;
        if (typeof keyOrGuild === "string")
            return super.get(keyOrGuild);
        return (_a = super.get(keyOrGuild.id)) !== null && _a !== void 0 ? _a : this.add(keyOrGuild);
    }
    add(guild) {
        const guildInterface = new MusicInterface_1.MusicInterface(guild);
        this.set(guild.id, guildInterface);
        return guildInterface;
    }
}
exports.MusicManager = MusicManager;
//# sourceMappingURL=MusicManager.js.map