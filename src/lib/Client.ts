import { Client, KlasaClientOptions, util } from "klasa";
import { join } from "path";
import { OPTIONS } from "./util/CONSTANTS";

const registerCoreDirectory = join(__dirname, "..", "/");

export class MusicClient extends Client {
    constructor(options?: KlasaClientOptions) {
        super(options);
        // @ts-ignore
        this.constructor[MusicClient.plugin].call(this);
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
        music: {
            nodes: Array<Record<string, any>>;
        };
    }
}
