import { Client, KlasaClientOptions } from "klasa";
import { Manager as LavacordManager, ManagerOptions as LavacordManagerOptions, LavalinkNodeOptions } from "@lavacord/discord.js";
import { MusicManager } from "./structures/MusicManager";
import { join } from "path";

export class MusicClient extends Client {

    public lavalink!: LavacordManager;

    constructor(options?: KlasaClientOptions) {
        super(options);

        // @ts-ignore
        MusicClient[Client.plugin].call(this);
    }

    static [Client.plugin](this: MusicClient): void {
        const coreDirectory = join(__dirname, "..");
        this.lavalink = new LavacordManager(this, this.options.music.nodes, this.options.music);
        this.music = new MusicManager();

        this.events["registerCoreDirectory"](coreDirectory);
        this.inhibitors["registerCoreDirectory"](coreDirectory);
        this.extendables["registerCoreDirectory"](coreDirectory);
        this.arguments["registerCoreDirectory"](coreDirectory);
        this.commands["registerCoreDirectory"](coreDirectory);
    }

}

declare module "discord.js" {
    interface ClientOptions {
        music: { nodes: LavalinkNodeOptions[]; } & LavacordManagerOptions;
    }
}
