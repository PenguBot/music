import { KlasaUser } from "klasa";
import { TrackData } from "@lavacord/discord.js";
export declare class Song {
    id: string;
    requester: KlasaUser;
    track: string;
    title: string;
    author: string;
    seekable: boolean;
    stream: boolean;
    length: number;
    position: number;
    url: string;
    constructor(data: TrackData, requester: KlasaUser);
    get friendlyDuration(): string;
    get toJSON(): Record<string, any>;
}
