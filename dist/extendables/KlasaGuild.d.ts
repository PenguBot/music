import { Extendable, ExtendableStore } from "klasa";
import { MusicManager } from "../lib/structures/MusicManager";
import { MusicInterface } from "../lib/structures/MusicInterface";
export default class extends Extendable {
    constructor(store: ExtendableStore, file: string[], directory: string);
    get music(): MusicInterface;
}
declare module "discord.js" {
    interface Client {
        music: MusicManager;
    }
}
