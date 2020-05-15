import { KlasaGuild, KlasaUser } from "klasa";
import { MusicClient as Client } from "../Client";
import { VoiceChannel, TextChannel, GuildMember } from "discord.js";
import { Player, LavalinkNode, TrackResponse } from "@lavacord/discord.js";
import { Song } from "./Song";
import { getTimeString, shuffleArray } from "../utils/utils";
import { sleep } from "@klasa/utils";

export class MusicInterface {

    public client: Client;
    public guild: KlasaGuild;
    public textChannel: TextChannel | null = null;
    public queue: Song[] = [];
    public looping = false;

    public constructor(guild: KlasaGuild) {
        this.client = guild.client;
        this.guild = guild;
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

    public leave(): Promise<boolean> {
        return this.client.lavalink.leave(this.guild.id);
    }

    public add(user: KlasaUser, data: TrackResponse): Song[] {
        const structuredSongs = data.tracks.map(s => new Song(s, user));
        this.queue.push(...structuredSongs);
        return structuredSongs;
    }

    public async play(): Promise<this> {
        const [song] = this.queue;
        await this.player!.play(song.track);
        this.client.emit("musicPlay", this.guild);
        return this;
    }

    public async skip(): Promise<this> {
        const { player } = this;
        if (player!.playing) await player!.stop();
        return this;
    }

    public async pause(): Promise<this> {
        const { player } = this;
        await player!.pause(!this.paused);
        return this;
    }

    public async setVolume(volume: number): Promise<this> {
        if (this.playing && this.player) await this.player.volume(volume);
        return this;
    }

    public clearQueue(): this {
        this.queue = [];
        return this;
    }

    public shuffleQueue(): this {
        const [first] = this.queue;
        this.queue.shift();
        this.queue = shuffleArray(this.queue as []);
        this.queue.unshift(first);
        return this;
    }

    public async seek(position: number): Promise<this> {
        await this.player!.seek(position);
        return this;
    }

    public async destroy(): Promise<void> {
        this.queue = [];
        this.textChannel = null;
        this.looping = false;

        await this.player!.destroy();
        this.client.music.delete(this.guild.id);
    }

    public get currentTimeString(): string | null {
        if (this.player) return `${getTimeString(this.player.timestamp!)} / ${getTimeString(this.queue[0].length)}`;
        return null;
    }

    public hasPermission(member: GuildMember): boolean | null {
        return (member.voice.channel!.speakable || member.voice.channel!.joinable) ?? null;
    }

    public get voiceChannel(): VoiceChannel | null {
        return this.guild.me!.voice.channel ?? null;
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
        if (this.player) return this.player.playing;
        return false;
    }

    public get paused(): boolean {
        if (this.player) return this.player.paused;
        return false;
    }

    public isMemberDJ(member: GuildMember): boolean {
        if (!this.guild.settings.get("toggles.djmode")) return true;
        const isDJ = this.guild.settings.get("user.dj").has(member.id);
        const hasDJRole = member.roles.has(this.guild.settings.get("roles.dj"));
        return isDJ ?? hasDJRole;
    }

}
