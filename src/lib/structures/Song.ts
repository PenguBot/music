import { KlasaUser } from "klasa";
import { TrackData } from "@lavacord/discord.js";
import { getTimeString } from "../utils/utils";

export class Song {

    public id: string;
    public requester: KlasaUser;
    public track: string;
    public title: string;
    public author: string;
    public seekable: boolean;
    public stream: boolean;
    public length: number;
    public position: number;
    public url: string;
    public skips: Set<string>;

    public constructor(data: TrackData, requester: KlasaUser) {
        this.id = data.info.identifier;
        this.requester = requester;
        this.track = data.track;
        this.title = data.info.title;
        this.author = data.info.author;
        this.seekable = data.info.isSeekable;
        this.stream = data.info.isStream;
        this.length = data.info.length;
        this.position = data.info.position;
        this.url = data.info.uri;
        this.skips = new Set();
    }

    public get friendlyDuration(): string {
        return this.stream ? "Live Stream" : getTimeString(this.length);
    }

    public toJSON(): SongJSON {
        return {
            id: this.id,
            requester: this.requester,
            track: this.track,
            title: this.title,
            author: this.author,
            isSeekable: this.seekable,
            isStream: this.stream,
            length: this.length,
            position: this.position,
            timeString: this.friendlyDuration,
            url: this.url
        };

    }

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
