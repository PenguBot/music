"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicInterface = void 0;
const Song_1 = require("./Song");
const utils_1 = require("../utils/utils");
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
            return Promise.reject(new Error("NO_NODES_AVAILABLE: There are no nodes available to use."));
        const player = await this.client.lavalink.join({
            guild: this.guild.id,
            channel: id,
            node: this.idealNode.id
        }, { selfdeaf: true });
        player.on("end", async (data) => {
            if (data.reason === "REPLACED")
                return;
            if (!this.looping)
                await this.skip();
            await this.play();
        }).on("error", async (event) => {
            await this.textChannel.send(`I am very sorry but was an error, please try again or contact us at https://discord.gg/kWMcUNe | Error: ${event.reason || event.error}`);
            await this.destroy();
        });
        return player;
    }
    leave() {
        return this.client.lavalink.leave(this.guild.id);
    }
    add(user, data) {
        const structuredSongs = data.tracks.map(s => new Song_1.Song(s, user));
        this.queue.push(...structuredSongs);
        this.client.emit("musicAdd", this, data);
        return structuredSongs;
    }
    play() {
        const [song] = this.queue;
        if (!this.queue.length)
            return Promise.resolve(this.client.emit("musicStop", this));
        if (!this.player)
            return Promise.resolve(false);
        return this.player.play(song.track, { volume: this.volume }).then(d => {
            this.client.emit("musicPlay", this);
            return d;
        });
    }
    async skip() {
        const { player } = this;
        this.queue.shift();
        await player.stop();
        return this;
    }
    pause() {
        return this.player ? this.player.pause(!this.paused) : Promise.resolve(false);
    }
    async setVolume(volume) {
        await this.guild.settings.update("misc.volume", volume);
        return this.player && this.playing ? this.player.volume(volume) : Promise.resolve(false);
    }
    clearQueue() {
        this.queue = [];
        return this;
    }
    shuffleQueue() {
        const first = this.queue.shift();
        utils_1.shuffleArray(this.queue);
        this.queue.unshift(first);
        return this.queue;
    }
    seek(position) {
        return this.player.seek(position);
    }
    async destroy() {
        this.queue = [];
        this.textChannel = null;
        this.looping = false;
        await this.leave();
        this.client.music.delete(this.guild.id);
    }
    hasPermission(member) {
        var _a;
        return (_a = (member.voice.channel.speakable || member.voice.channel.joinable)) !== null && _a !== void 0 ? _a : null;
    }
    isMemberDJ(member) {
        if (!this.guild.settings.get("toggles.djmode"))
            return true;
        const isDJ = this.guild.settings.get("user.dj").includes(member.id);
        const hasDJRole = member.roles.has(this.guild.settings.get("roles.dj"));
        return isDJ !== null && isDJ !== void 0 ? isDJ : hasDJRole;
    }
    get currentTimeString() {
        return this.player && this.queue[0] ? `${utils_1.getTimeString(this.player.state.position)} / ${utils_1.getTimeString(this.queue[0].length)}` : null;
    }
    get voiceChannel() {
        var _a;
        return (_a = this.guild.me.voice.channel) !== null && _a !== void 0 ? _a : null;
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
        return this.player ? this.player.playing : false;
    }
    get paused() {
        return this.player ? this.player.paused : false;
    }
}
exports.MusicInterface = MusicInterface;
//# sourceMappingURL=MusicInterface.js.map