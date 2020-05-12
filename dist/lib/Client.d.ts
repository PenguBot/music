import { Client, KlasaClientOptions } from "klasa";
import { Manager as LavacordManager, ManagerOptions as LavacordManagerOptions, LavalinkNodeOptions } from "@lavacord/discord.js";
import { Collection } from "discord.js";
import type { MusicInterface } from "./structures/MusicInterface";
export declare class MusicClient extends Client {
    lavalink: LavacordManager;
    music: Collection<string, MusicInterface>;
    constructor(options?: KlasaClientOptions);
}
declare module "discord.js" {
    interface ClientOptions {
        music: {
            nodes: LavalinkNodeOptions[];
        } & LavacordManagerOptions;
    }
}
