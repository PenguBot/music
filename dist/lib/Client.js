"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const discord_js_1 = require("@lavacord/discord.js");
const MusicManager_1 = require("./structures/MusicManager");
class MusicClient extends klasa_1.Client {
    constructor(options) {
        super(options);
        MusicClient[klasa_1.Client.plugin].call(this);
    }
    static [klasa_1.Client.plugin]() {
        this.lavalink = new discord_js_1.Manager(this, this.options.music.nodes, this.options.music);
        this.music = new MusicManager_1.MusicManager();
    }
}
exports.MusicClient = MusicClient;
//# sourceMappingURL=Client.js.map