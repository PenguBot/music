import { Client, KlasaClientOptions, util } from "klasa";
import { join } from "path";
import { OPTIONS } from "./util/CONSTANTS";
import { Manager as LavalinkManager, LavalinkNode } from "lavacord";
import { MusicManager } from "./structures/MusicManager";
import { Collection } from "discord.js";

const registerCoreDirectory = join(__dirname, "..", "/");

export class MusicClient extends Client {

    public lavalink!: LavalinkManager;
    public music!: Collection<string, Record<string, any>>;

    constructor(options?: KlasaClientOptions) {
        super(options);

        // @ts-ignore
        MusicClient[Client.plugin].call(this);
    }

    static [Client.plugin](this: MusicClient): void {
        util.mergeDefault(OPTIONS, this.options);
        this.lavalink = new LavalinkManager(this.options.music.nodes, { user: this.options.music.id, shards: this.options.music.shards });
        this.music = new MusicManager();
        this.arguments["registerCoreDirectory"](registerCoreDirectory);
        this.events["registerCoreDirectory"](registerCoreDirectory);
        this.inhibitors["registerCoreDirectory"](registerCoreDirectory);
    }

}

declare module "discord.js" {
    interface ClientOptions {
        music: {
            nodes: Array<LavalinkNode>;
            shards: number;
            id: string;
        };
    }
}
