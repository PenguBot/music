import { Argument, KlasaMessage, Possible } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
export default class extends Argument {
    run(arg: string, _: Possible, message: KlasaMessage): Promise<TrackResponse | void>;
    fetchTracks(arg: string): Promise<TrackResponse>;
    isLink(arg: string): boolean | string;
}
declare module "klasa" {
    interface KlasaMessage {
        prompt(message: KlasaMessage, content: string, time: number): KlasaMessage;
    }
}
