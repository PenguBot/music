import { Inhibitor, InhibitorStore, KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
export default class extends Inhibitor {
    constructor(store: InhibitorStore, file: string[], directory: string);
    run(message: KlasaMessage, command: MusicCommand): Promise<void>;
}
