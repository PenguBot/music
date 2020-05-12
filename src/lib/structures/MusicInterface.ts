import { KlasaGuild } from "klasa";
import { MusicClient as Client } from "../Client";
import { VoiceChannel, TextChannel } from "discord.js";
import { Player, LavalinkNode } from "lavacord";

export class MusicInterface {

    public client: Client;
    public guild: KlasaGuild;
    public textChannel: TextChannel | null;
    public queue: Array<any>;
    public playing: boolean | null;
    public paused: boolean | null;
    public looping: boolean | null;

    public constructor(guild: KlasaGuild) {
        this.client = guild.client as Client;
        this.guild = guild;

        this.textChannel = null;
        this.queue = [];
        this.playing = false;
        this.paused = false;
        this.looping = false;
    }

    public join(voiceChannel: VoiceChannel): Record<string, any> {
        if (!this.idealNode) throw new Error("NO_NODES_AVAILABLE: There are no nodes available to use.");
        this.client.lavalink.join({
            guild: this.guild.id,
            channel: voiceChannel.id,
            node: this.idealNode.id
        }, { selfdeaf: true });

        return this;
    }

    public leave(): void {
        this.client.lavalink.leave(this.guild.id);
        this.playing = false;
    }

    public play(): Player {
        if (!this.voiceChannel) throw "The bot isnt in the voice channel so it can't play you any songs";
        if (!this.player) throw "Something went wrong, try again.";
        if (!this.queue.length) throw "Can't play songs from an empty queue. Queue up some songs!";

        const [song] = this.queue;

        this.player.play(song.track);

        this.playing = true;
        return this.player;
    }

    public async skip(force = true): Promise<this> {
        const { player } = this;
        if (player && force) await player.stop();
        else this.queue.shift();
        return this;
    }

    public pause(): boolean {
        if (!this.player) return false;
        const paused = !this.paused;
        this.player.pause(paused);
        this.paused = paused;
        return paused;
    }

    public setVolume(volume: number): void {
        const { player } = this;
        if (this.playing && player) player.volume(volume);
        this.guild.settings.update("misc.volume", volume);
    }

    public clearQueue(): Record<string, any> {
        this.queue = [];
        return this;
    }

    public destroy(): void {
        this.queue = [];
        this.playing = null;
        this.paused = null;
        this.textChannel = null;
        this.looping = null;

        this.leave();
        this.client.music.delete(this.guild.id);
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

}
