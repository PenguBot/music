import { KlasaGuild, KlasaUser } from "klasa";
import { VoiceChannel, TextChannel, GuildMember, Client } from "discord.js";
import { Player, LavalinkNode, TrackResponse } from "@lavacord/discord.js";
import { Song } from "./Song";
export declare class MusicInterface {
    client: Client;
    guild: KlasaGuild;
    textChannel: TextChannel | null;
    queue: Song[];
    looping: boolean;
    constructor(guild: KlasaGuild);
    join(id: string): Promise<Player>;
    leave(): Promise<boolean>;
    add(user: KlasaUser, data: TrackResponse): Song[];
    play(): Promise<boolean>;
    skip(): Promise<this>;
    pause(): Promise<boolean>;
    setVolume(volume: number): Promise<boolean>;
    clearQueue(): this;
    shuffleQueue(): Song[];
    seek(position: number): Promise<boolean>;
    destroy(): Promise<void>;
    hasPermission(member: GuildMember): boolean | null;
    isMemberDJ(member: GuildMember): boolean;
    get currentTimeString(): string | null;
    get voiceChannel(): VoiceChannel | null;
    get player(): Player | null;
    get volume(): number;
    get idealNode(): LavalinkNode | null;
    get playing(): boolean;
    get paused(): boolean;
}
