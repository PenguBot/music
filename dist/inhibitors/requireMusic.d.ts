import { Inhibitor, InhibitorStore, KlasaMessage, Command } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
import { MusicInterface } from "../lib/structures/MusicInterface";
import { Manager } from "@lavacord/discord.js";
export default class extends Inhibitor {
    constructor(store: InhibitorStore, file: string[], directory: string);
    run(message: KlasaMessage, command: MusicCommand | Command): Promise<void>;
    init(): Promise<void>;
}
declare module "discord.js" {
    interface Guild {
        music: MusicInterface;
    }
}
declare module "klasa" {
    interface KlasaClient {
        lavalink: Manager;
    }
}
