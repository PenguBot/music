import { Client, KlasaClientOptions } from "klasa";
import { Manager as LavacordManager, ManagerOptions as LavacordManagerOptions, LavalinkNodeOptions } from "@lavacord/discord.js";
import { MusicManager } from "./structures/MusicManager";
import { Collection } from "discord.js";
import type { MusicInterface } from "./structures/MusicInterface";
import { join } from "path";

const registerCoreDirectory = join(__dirname, "..", "/");

export class MusicClient extends Client {

    public lavalink!: LavacordManager;
    public music!: Collection<string, MusicInterface>;

    constructor(options?: KlasaClientOptions) {
        super(options);

        // @ts-ignore
        MusicClient[Client.plugin].call(this);
    }

    static [Client.plugin](this: MusicClient): void {
        this.lavalink = new LavacordManager(this, this.options.music.nodes, this.options.music);
        this.music = new MusicManager();
        this.events["registerCoreDirectory"](registerCoreDirectory);
        this.inhibitors["registerCoreDirectory"](registerCoreDirectory);
        this.extendables["registerCoreDirectory"](registerCoreDirectory);
    }

}

declare module "discord.js" {
    interface ClientOptions {
        music: { nodes: LavalinkNodeOptions[]; } & LavacordManagerOptions;
    }
}
