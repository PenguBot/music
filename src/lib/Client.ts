import { Client, KlasaClientOptions, util } from "klasa";
import { join } from "path";
import { OPTIONS } from "./util/CONSTANTS";
import { Manager as LavalinkManager, LavalinkNode } from "lavacord";
import { MusicManager } from "./structures/MusicManager";
import { Collection } from "discord.js";

const registerCoreDirectory = join(__dirname, "..", "/");

export class MusicClient extends Client {

    public lavalink: LavalinkManager;
    public music: Collection<string, Record<string, any>>;

    constructor(options?: KlasaClientOptions) {
        super(options);

        // @ts-ignore
        this.constructor[MusicClient.plugin].call(this);
        this.lavalink = new LavalinkManager(this.options.pengumusic.nodes, { user: this.options.pengumusic.id, shards: this.options.pengumusic.shards });
        this.music = new MusicManager();
    }

    static [Client.plugin](this: MusicClient): void {
        const typedThis = this as unknown as MusicClient;
        util.mergeDefault(OPTIONS, typedThis.options);

        // @ts-ignore
        typedThis.arguments.registerCoreDirectory(registerCoreDirectory);
        // @ts-ignore
        typedThis.events.registerCoreDirectory(registerCoreDirectory);
        // @ts-ignore
        typedThis.inhibitors.registerCoreDirectory(registerCoreDirectory);
    }

}

declare module "discord.js" {
    interface ClientOptions {
        pengumusic: {
            nodes: Array<LavalinkNode>;
            shards: number;
            id: string;
        };
    }
}
