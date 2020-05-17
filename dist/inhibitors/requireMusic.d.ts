import { Inhibitor, KlasaMessage, Command } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
export default class extends Inhibitor {
    run(message: KlasaMessage, command: MusicCommand | Command): Promise<void>;
}
