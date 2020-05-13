import { KlasaGuild, KlasaUser } from "klasa";
import { MusicClient as Client } from "../Client";
import { VoiceChannel, TextChannel } from "discord.js";
import { Player, LavalinkNode, TrackData } from "@lavacord/discord.js";
import { Song } from "./Song";
import { getTimeString } from "../utils/utils";

export class MusicInterface {

    public client: Client;
    public guild: KlasaGuild;
    public textChannel: TextChannel | null;
    public queue: Array<Song>;
    public looping: boolean | null;

    public constructor(guild: KlasaGuild) {
        this.client = guild.client as Client;
        this.guild = guild;

        this.textChannel = null;
        this.queue = [];
        this.looping = false;
    }

    public async join(voiceChannel: VoiceChannel): Promise<this> {
        if (!this.idealNode) throw new Error("NO_NODES_AVAILABLE: There are no nodes available to use.");
        await this.client.lavalink.join({
            guild: this.guild.id,
            channel: voiceChannel.id,
            node: this.idealNode.id
        }, { selfdeaf: true });
        return this;
    }

    public async leave(): Promise<this> {
        await this.client.lavalink.leave(this.guild.id);
        return this;
    }

    public add(user: KlasaUser, data: TrackData[]): Song[] {
        const structuredSongs = data.map(s => new Song(s, user));
        this.queue.push(...structuredSongs);
        return structuredSongs;
    }

    public async play(): Promise<this> {
        if (!this.voiceChannel) throw "The bot isnt in the voice channel so it can't play you any songs";
        if (!this.player) throw "Something went wrong, try again.";
        if (!this.queue.length) throw "Can't play songs from an empty queue. Queue up some songs!";

        const [song] = this.queue;

        await this.player.play(song.track);
        if (!this.looping) this.queue.shift();
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

    public destroy(): void {
        this.queue = [];
        this.textChannel = null;
        this.looping = null;

        this.leave();
        this.client.music.delete(this.guild.id);
    }

    public get currentTimeString(): string | null {
        const { player } = this;
        if (player) return `${getTimeString(player.timestamp!)} / ${getTimeString(this.queue[0].length)}`;
        return null;
    }

    public get voiceChannel(): VoiceChannel | null {
        return this.guild.me?.voice.channel ?? null;
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

    public paused(): boolean {
        const { player } = this;
        if (player) return player.paused;
        return false;
    }

}
