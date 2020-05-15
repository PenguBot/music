import { Inhibitor, InhibitorStore, KlasaMessage, Command } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
export default class extends Inhibitor {
    constructor(store: InhibitorStore, file: string[], directory: string);
    run(message: KlasaMessage, command: MusicCommand | Command): Promise<void>;
}
