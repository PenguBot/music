import { Extendable, ExtendableStore } from "klasa";
import { MusicInterface } from "../lib/structures/MusicInterface";
export default class extends Extendable {
    constructor(store: ExtendableStore, file: string[], directory: string);
    get music(): MusicInterface;
}
