"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicInterface = void 0;
const Song_1 = require("./Song");
const utils_1 = require("../utils/utils");
const utils_2 = require("@klasa/utils");
class MusicInterface {
    constructor(guild) {
        this.client = guild.client;
        this.guild = guild;
        this.textChannelID = "";
        this.queue = [];
        this.looping = false;
    }
    async join(id) {
        if (!this.idealNode)
            throw new Error("NO_NODES_AVAILABLE: There are no nodes available to use.");
        await this.client.lavalink.join({
            guild: this.guild.id,
            channel: id,
            node: this.idealNode.id
        }, { selfdeaf: true });
        await utils_2.sleep(450);
        return this;
    }
    async leave() {
        await this.client.lavalink.leave(this.guild.id);
        return this;
    }
    add(user, data) {
        const structuredSongs = data.tracks.map(s => new Song_1.Song(s, user));
        this.queue.push(...structuredSongs);
        return structuredSongs;
    }
    async play() {
        var _a;
        if (!this.voiceChannel)
            throw "The bot isnt in the voice channel so it can't play you any songs";
        if (!this.player)
            throw "Something went wrong, try again.";
        if (!this.queue.length)
            throw "Can't play songs from an empty queue. Queue up some songs!";
        const [song] = this.queue;
        await this.player.play(song.track);
        if (!this.looping) {
            await ((_a = this.textChannel) === null || _a === void 0 ? void 0 : _a.send(`> Now Playing: ${song.title}`));
            this.queue.shift();
        }
        return this;
    }
    async skip() {
        const { player } = this;
        if (player === null || player === void 0 ? void 0 : player.playing)
            await (player === null || player === void 0 ? void 0 : player.stop());
        return this;
    }
    async pause() {
        const { player } = this;
        await (player === null || player === void 0 ? void 0 : player.pause(!this.paused));
        return this;
    }
    async setVolume(volume) {
        const { player } = this;
        if (this.playing && player)
            await player.volume(volume);
        return this;
    }
    clearQueue() {
        this.queue = [];
        return this;
    }
    async shuffleQueue() {
        let len = this.queue.length;
        this.queue.shift();
        while (len) {
            const i = Math.floor(Math.random() * len--);
            [this.queue[len], this.queue[i]] = [this.queue[i], this.queue[len]];
        }
        await this.play();
        return this;
    }
    async seek(position) {
        const { player } = this;
        await (player === null || player === void 0 ? void 0 : player.seek(position));
        return this;
    }
    destroy() {
        this.queue = [];
        this.textChannelID = "";
        this.looping = null;
        this.leave();
        this.client.music.delete(this.guild.id);
    }
    get currentTimeString() {
        const { player } = this;
        if (player)
            return `${utils_1.getTimeString(player.timestamp)} / ${utils_1.getTimeString(this.queue[0].length)}`;
        return null;
    }
    get voiceChannel() {
        var _a, _b;
        return (_b = (_a = this.guild.me) === null || _a === void 0 ? void 0 : _a.voice.channel) !== null && _b !== void 0 ? _b : null;
    }
    get textChannel() {
        var _a;
        return (_a = this.guild.client.channels.get(this.textChannelID)) !== null && _a !== void 0 ? _a : null;
    }
    get player() {
        var _a;
        return (_a = this.client.lavalink.players.get(this.guild.id)) !== null && _a !== void 0 ? _a : null;
    }
    get volume() {
        return this.guild.settings.get("misc.volume");
    }
    get idealNode() {
        var _a;
        return (_a = this.client.lavalink.idealNodes[0]) !== null && _a !== void 0 ? _a : null;
    }
    get playing() {
        const { player } = this;
        if (player)
            return player.playing;
        return false;
    }
    paused() {
        const { player } = this;
        if (player)
            return player.paused;
        return false;
    }
}
exports.MusicInterface = MusicInterface;
//# sourceMappingURL=MusicInterface.js.map