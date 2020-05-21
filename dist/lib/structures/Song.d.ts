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
    skips: Set<string>;
    data: TrackData;
    constructor(data: TrackData, requester: KlasaUser);
    get friendlyDuration(): string;
    toJSON(): SongJSON;
}
export interface SongJSON {
    id: string;
    requester: KlasaUser;
    track: string;
    title: string;
    author: string;
    isSeekable: boolean;
    isStream: boolean;
    length: number;
    position: number;
    timeString: string;
    url: string;
}
