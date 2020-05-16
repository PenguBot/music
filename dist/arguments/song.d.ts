import { Argument, KlasaMessage, Possible } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
export default class extends Argument {
    run(arg: string, _: Possible, message: KlasaMessage): Promise<TrackResponse | undefined>;
    fetchTracks(arg: string): Promise<TrackResponse>;
}
