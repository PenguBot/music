import { CommandStore, KlasaMessage, Command } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
export default class extends Command {
    constructor(store: CommandStore, file: string[], directory: string);
    run(message: KlasaMessage, [song]: [TrackResponse]): Promise<any>;
}
