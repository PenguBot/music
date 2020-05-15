"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicInterface = void 0;
const Song_1 = require("./Song");
const utils_1 = require("../utils/utils");
const utils_2 = require("@klasa/utils");
class MusicInterface {
    constructor(guild) {
        this.textChannel = null;
        this.queue = [];
        this.looping = false;
        this.client = guild.client;
        this.guild = guild;
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
    leave() {
        return this.client.lavalink.leave(this.guild.id);
    }
    add(user, data) {
        const structuredSongs = data.tracks.map(s => new Song_1.Song(s, user));
        this.queue.push(...structuredSongs);
        return structuredSongs;
    }
    async play() {
        const [song] = this.queue;
        await this.player?.play(song.track);
        this.client.emit("musicPlay", this.guild);
        return this;
    }
    async skip() {
        const { player } = this;
        if (player.playing)
            await player.stop();
        return this;
    }
    async pause() {
        const { player } = this;
        await player.pause(!this.paused);
        return this;
    }
    async setVolume(volume) {
        if (this.playing && this.player)
            await this.player.volume(volume);
        return this;
    }
    clearQueue() {
        this.queue = [];
        return this;
    }
    shuffleQueue() {
        const [first] = this.queue;
        this.queue.shift();
        this.queue = utils_1.shuffleArray(this.queue);
        this.queue.unshift(first);
        return this;
    }
    async seek(position) {
        await this.player.seek(position);
        return this;
    }
    async destroy() {
        this.queue = [];
        this.textChannel = null;
        this.looping = false;
        await this.player.destroy();
        this.client.music.delete(this.guild.id);
    }
    get currentTimeString() {
        if (this.player)
            return `${utils_1.getTimeString(this.player.timestamp)} / ${utils_1.getTimeString(this.queue[0].length)}`;
        return null;
    }
    hasPermission(member) {
        return (member.voice.channel.speakable || member.voice.channel.joinable) ?? null;
    }
    get voiceChannel() {
        return this.guild.me.voice.channel ?? null;
    }
    get player() {
        return this.client.lavalink.players.get(this.guild.id) ?? null;
    }
    get volume() {
        return this.guild.settings.get("misc.volume");
    }
    get idealNode() {
        return this.client.lavalink.idealNodes[0] ?? null;
    }
    get playing() {
        if (this.player)
            return this.player.playing;
        return false;
    }
    get paused() {
        if (this.player)
            return this.player.paused;
        return false;
    }
    isMemberDJ(member) {
        if (!this.guild.settings.get("toggles.djmode"))
            return true;
        const isDJ = this.guild.settings.get("user.dj").has(member.id);
        const hasDJRole = member.roles.has(this.guild.settings.get("roles.dj"));
        return isDJ ?? hasDJRole;
    }
}
exports.MusicInterface = MusicInterface;
//# sourceMappingURL=MusicInterface.js.map