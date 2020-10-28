/* eslint-disable dot-notation */
import { Client, KlasaClientOptions } from "@pengubot/klasa";
import { Manager as LavacordManager, ManagerOptions as LavacordManagerOptions, LavalinkNodeOptions } from "@lavacord/discord.js";
import { MusicManager } from "./structures/MusicManager";
import { join } from "path";

import "./schemas/defaultGuildSchema";
import "./extensions/Guild";
import "./extensions/Message";

export class MusicClient extends Client {

    public lavalink!: LavacordManager;
    public music!: MusicManager;

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
        this.arguments["registerCoreDirectory"](coreDirectory);
        this.commands["registerCoreDirectory"](coreDirectory);
        this.tasks["registerCoreDirectory"](coreDirectory);
    }

}

declare module "discord.js" {
    interface Client {
        lavalink: LavacordManager;
        music: MusicManager;
    }

    interface ClientOptions {
        music: {
            nodes: LavalinkNodeOptions[];
            lyrics: string;
            spotify: { buffer: Base64String; token: string; };
        } & LavacordManagerOptions;
    }
}
