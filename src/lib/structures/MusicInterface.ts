import { KlasaGuild, KlasaUser } from "klasa";
import { VoiceChannel, TextChannel, GuildMember, Client } from "discord.js";
import { Player, LavalinkNode, TrackResponse } from "@lavacord/discord.js";
import { Song } from "./Song";
import { getTimeString, shuffleArray } from "../utils/utils";

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

    public join(id: string): Promise<Player> {
        if (!this.idealNode) return Promise.reject(new Error("NO_NODES_AVAILABLE: There are no nodes available to use."));
        return this.client.lavalink.join({
            guild: this.guild.id,
            channel: id,
            node: this.idealNode.id
        }, { selfdeaf: true });
    }

    public leave(): Promise<boolean> {
        return this.client.lavalink.leave(this.guild.id);
    }

    public async add(user: KlasaUser, data: TrackResponse): Promise<Song[]> {
        const structuredSongs = data.tracks.map(s => new Song(s, user));
        this.queue.push(...structuredSongs);
        await this.client.emit("add", this.guild, structuredSongs, data);
        return structuredSongs;
    }

    public async play(): Promise<boolean> {
        const [song] = this.queue;
        return this.player!.play(song.track).then(d => {
            this.client.emit("play", this.guild);
            return d;
        });
    }

    public async skip(): Promise<this> {
        const { player } = this;
        if (player!.playing) {
            this.queue.shift();
            await player!.stop();
        }
        return this;
    }

    public pause(): Promise<boolean> {
        return this.player!.pause(!this.paused);
    }

    public setVolume(volume: number): Promise<boolean> {
        return this.player && this.playing ? this.player.volume(volume) : Promise.resolve(false);
    }

    public clearQueue(): this {
        this.queue = [];
        return this;
    }

    public shuffleQueue(): this {
        const [first] = this.queue;
        this.queue.shift();
        this.queue = shuffleArray(this.queue);
        this.queue.unshift(first);
        return this;
    }

    public seek(position: number): Promise<boolean> {
        return this.player!.seek(position);
    }

    public async destroy(): Promise<void> {
        this.queue = [];
        this.textChannel = null;
        this.looping = false;

        await this.player!.destroy();
        this.client.music.delete(this.guild.id);
    }

    public hasPermission(member: GuildMember): boolean | null {
        return (member.voice.channel!.speakable || member.voice.channel!.joinable) ?? null;
    }

    public isMemberDJ(member: GuildMember): boolean {
        if (!this.guild.settings.get("toggles.djmode")) return true;
        const isDJ = this.guild.settings.get("user.dj").has(member.id);
        const hasDJRole = member.roles.has(this.guild.settings.get("roles.dj"));
        return isDJ ?? hasDJRole;
    }

    public get currentTimeString(): string | null {
        return this.player ? `${getTimeString(this.player.timestamp!)} / ${getTimeString(this.queue[0].length)}` : null;
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
        return this.player ? this.player.playing : false;
    }

    public get paused(): boolean {
        return this.player ? this.player.paused : false;
    }

}
