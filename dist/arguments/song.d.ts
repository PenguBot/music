import { Argument, KlasaMessage, Possible } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
export default class extends Argument {
    run(arg: string, _: Possible, message: KlasaMessage): Promise<TrackResponse | void>;
    search(message: KlasaMessage, arg: string): Promise<TrackResponse>;
    dump(message: KlasaMessage, arg: string): Promise<TrackResponse>;
    spotify(message: KlasaMessage, arg: string): Promise<TrackResponse>;
    spotifyTrack(message: KlasaMessage, arg: string): Promise<TrackResponse>;
    fetchTracks(arg: string): Promise<TrackResponse>;
}
