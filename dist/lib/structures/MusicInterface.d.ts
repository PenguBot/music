import { KlasaGuild, KlasaUser } from "klasa";
import { MusicClient as Client } from "../Client";
import { VoiceChannel, TextChannel, GuildMember } from "discord.js";
import { Player, LavalinkNode, TrackResponse } from "@lavacord/discord.js";
import { Song } from "./Song";
export declare class MusicInterface {
    client: Client;
    guild: KlasaGuild;
    textChannelID: string;
    queue: Array<Song>;
    looping: boolean | null;
    constructor(guild: KlasaGuild);
    join(id: string): Promise<this>;
    leave(): Promise<this>;
    add(user: KlasaUser, data: TrackResponse): Song[];
    play(): Promise<this>;
    skip(): Promise<this>;
    pause(): Promise<this>;
    setVolume(volume: number): Promise<this>;
    clearQueue(): this;
    shuffleQueue(): Promise<this>;
    seek(position: number): Promise<this>;
    destroy(): Promise<void>;
    get currentTimeString(): string | null;
    hasPermission(member: GuildMember): boolean | null;
    get voiceChannel(): VoiceChannel | null;
    get textChannel(): TextChannel | null;
    get player(): Player | null;
    get volume(): number;
    get idealNode(): LavalinkNode | null;
    get playing(): boolean;
    get paused(): boolean;
    isMemberDJ(member: GuildMember): boolean;
}
