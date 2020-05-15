import { Argument, KlasaMessage, Possible } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
export default class extends Argument {
    run(arg: string, _: Possible, message: KlasaMessage): Promise<TrackResponse | undefined>;
    fetchTracks(arg: string): Promise<TrackResponse>;
}
declare module "discord.js" {
    interface Message {
        prompt(message: Message, content: string, time: number): Message;
    }
}
