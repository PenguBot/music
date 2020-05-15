import { KlasaGuild, KlasaUser } from "klasa";
import { MusicClient as Client } from "../Client";
import { VoiceChannel, TextChannel, GuildMember } from "discord.js";
import { Player, LavalinkNode, TrackResponse } from "@lavacord/discord.js";
import { Song } from "./Song";
import { getTimeString } from "../utils/utils";
import { sleep } from "@klasa/utils";

export class MusicInterface {

    public client: Client;
    public guild: KlasaGuild;
    public textChannelID: string;
    public queue: Array<Song>;
    public looping: boolean | null;

    public constructor(guild: KlasaGuild) {
        this.client = guild.client as Client;
        this.guild = guild;

        this.textChannelID = "";
        this.queue = [];
        this.looping = false;
    }

    public async join(id: string): Promise<this> {
        if (!this.idealNode) throw new Error("NO_NODES_AVAILABLE: There are no nodes available to use.");
        await this.client.lavalink.join({
            guild: this.guild.id,
            channel: id,
            node: this.idealNode.id
        }, { selfdeaf: true });
        await sleep(450);
        return this;
    }

    public async leave(): Promise<this> {
        await this.client.lavalink.leave(this.guild.id);
        return this;
    }

    public add(user: KlasaUser, data: TrackResponse): Song[] {
        const structuredSongs = data.tracks.map(s => new Song(s, user));
        this.queue.push(...structuredSongs);
        return structuredSongs;
    }

    public async play(): Promise<this> {
        if (!this.voiceChannel) throw "The bot isnt in the voice channel so it can't play you any songs";
        if (!this.player) throw "Something went wrong, try again.";
        if (!this.queue.length) throw "Can't play songs from an empty queue. Queue up some songs!";

        const [song] = this.queue;
        await this.player.play(song.track);

        this.client.emit("musicPlayEvent", this.guild);
        return this;
    }

    public async skip(): Promise<this> {
        const { player } = this;
        if (player?.playing) await player?.stop();
        return this;
    }

    public async pause(): Promise<this> {
        const { player } = this;
        await player?.pause(!this.paused);
        return this;
    }

    public async setVolume(volume: number): Promise<this> {
        const { player } = this;
        if (this.playing && player) await player.volume(volume);
        return this;
    }

    public clearQueue(): this {
        this.queue = [];
        return this;
    }

    public async shuffleQueue(): Promise<this> {
        let len = this.queue.length;
        this.queue.shift();

        while (len) {
            const i = Math.floor(Math.random() * len--);
            [this.queue[len], this.queue[i]] = [this.queue[i], this.queue[len]];
        }

        await this.play();
        return this;
    }

    public async seek(position: number): Promise<this> {
        const { player } = this;
        await player?.seek(position);
        return this;
    }

    public async destroy(): Promise<void> {
        this.queue = [];
        this.textChannelID = "";
        this.looping = null;

        await this.leave();
        this.client.music.delete(this.guild.id);
    }

    public get currentTimeString(): string | null {
        const { player } = this;
        if (player) return `${getTimeString(player.timestamp!)} / ${getTimeString(this.queue[0].length)}`;
        return null;
    }

    public hasPermission(member: GuildMember): boolean | null {
        return (member.voice.channel?.speakable || member.voice.channel?.joinable) ?? null;
    }

    public get voiceChannel(): VoiceChannel | null {
        return this.guild.me?.voice.channel ?? null;
    }

    public get textChannel(): TextChannel | null {
        return this.guild.client.channels.get(this.textChannelID) as TextChannel ?? null;
    }

    public get player(): Player | null {
        return this.client.lavalink.players.get(this.guild.id) ?? null;
    }

    public get volume(): number {
        return this.guild.settings.get("misc.volume");
    }

    public get idealNode(): LavalinkNode | null {
        return this.client.lavalink.idealNodes[0] ?? null;
    }

    public get playing(): boolean {
        const { player } = this;
        if (player) return player.playing;
        return false;
    }

    public get paused(): boolean {
        const { player } = this;
        if (player) return player.paused;
        return false;
    }

    public isMemberDJ(member: GuildMember): boolean {
        if (!this.guild.settings.get("toggles.djmode")) return true;
        const isDJ = this.guild.settings.get("user.dj").has(member.id);
        const hasDJRole = member.roles.has(this.guild.settings.get("roles.dj"));
        return isDJ ?? hasDJRole;
    }

}
