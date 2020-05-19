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

    public async join(id: string): Promise<Player> {
        if (!this.idealNode) return Promise.reject(new Error("NO_NODES_AVAILABLE: There are no nodes available to use."));
        const player = await this.client.lavalink.join({
            guild: this.guild.id,
            channel: id,
            node: this.idealNode.id
        }, { selfdeaf: true });

        player!.on("end", async data => {
            if (data.reason === "REPLACED") return;
            if (!this.looping) await this.skip();
            await this.play();
        }).on("error", async event => {
            await this.textChannel!.send(`I am very sorry but was an error, please try again or contact us at https://discord.gg/kWMcUNe | Error: ${event.reason || (event as any).error}`);
            await this.destroy();
        });

        return player;
    }

    public leave(): Promise<boolean> {
        return this.client.lavalink.leave(this.guild.id);
    }

    public add(user: KlasaUser, data: TrackResponse): Song[] {
        const structuredSongs = data.tracks.map(s => new Song(s, user));
        this.queue.push(...structuredSongs);
        this.client.emit("musicAdd", this, data);
        return structuredSongs;
    }

    public play(): Promise<boolean> {
        const [song] = this.queue;
        if (!this.queue.length) return Promise.resolve(this.client.emit("musicStop", this));
        if (!this.player) return Promise.resolve(false);
        return this.player!.play(song.track, { volume: this.volume }).then(d => {
            this.client.emit("musicPlay", this);
            return d;
        });
    }

    public async skip(): Promise<this> {
        const { player } = this;
        this.queue.shift();
        await player!.stop();
        return this;
    }

    public pause(): Promise<boolean> {
        return this.player!.pause(!this.paused);
    }

    public async setVolume(volume: number): Promise<boolean> {
        await this.guild.settings.update("misc.volume", volume);
        return this.player && this.playing ? this.player.volume(volume) : Promise.resolve(false);
    }

    public clearQueue(): this {
        this.queue = [];
        return this;
    }

    public shuffleQueue(): Song[] {
        const first = this.queue.shift();
        shuffleArray(this.queue);
        this.queue.unshift(first!);
        return this.queue;
    }

    public seek(position: number): Promise<boolean> {
        return this.player!.seek(position);
    }

    public async destroy(): Promise<void> {
        this.queue = [];
        this.textChannel = null;
        this.looping = false;

        await this.leave();
        this.client.music.delete(this.guild.id);
    }

    public hasPermission(member: GuildMember): boolean | null {
        return (member.voice.channel!.speakable || member.voice.channel!.joinable) ?? null;
    }

    public isMemberDJ(member: GuildMember): boolean {
        if (!this.guild.settings.get("toggles.djmode")) return true;
        const isDJ = this.guild.settings.get("user.dj").includes(member.id);
        const hasDJRole = member.roles.has(this.guild.settings.get("roles.dj"));
        return isDJ ?? hasDJRole;
    }

    public get currentTimeString(): string | null {
        return this.player && this.queue[0] ? `${getTimeString(this.player.state.position!)} / ${getTimeString(this.queue[0].length)}` : null;
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
