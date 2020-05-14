import { Client, KlasaClientOptions } from "klasa";
import { Manager as LavacordManager, ManagerOptions as LavacordManagerOptions, LavalinkNodeOptions } from "@lavacord/discord.js";
export declare class MusicClient extends Client {
    lavalink: LavacordManager;
    constructor(options?: KlasaClientOptions);
}
declare module "discord.js" {
    interface ClientOptions {
        music: {
            nodes: LavalinkNodeOptions[];
        } & LavacordManagerOptions;
    }
}
