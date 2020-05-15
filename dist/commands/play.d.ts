import { CommandStore, KlasaMessage } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
import { MusicCommand } from "../lib/structures/MusicCommand";
export default class extends MusicCommand {
    constructor(store: CommandStore, file: string[], directory: string);
    run(message: KlasaMessage, [song]: [TrackResponse]): Promise<any>;
}
