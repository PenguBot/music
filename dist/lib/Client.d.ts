import { Client, KlasaClientOptions } from "klasa";
import { Manager as LavacordManager, ManagerOptions as LavacordManagerOptions, LavalinkNodeOptions } from "@lavacord/discord.js";
import { MusicManager } from "./structures/MusicManager";
import "./schemas/defaultGuildSchema";
import "./extensions/Guild";
import "./extensions/Message";
export declare class MusicClient extends Client {
    lavalink: LavacordManager;
    music: MusicManager;
    constructor(options?: KlasaClientOptions);
}
declare module "discord.js" {
    interface Client {
        lavalink: LavacordManager;
        music: MusicManager;
    }
    interface ClientOptions {
        music: {
            nodes: LavalinkNodeOptions[];
        } & LavacordManagerOptions;
    }
}
