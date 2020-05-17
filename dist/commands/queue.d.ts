import { MusicCommand } from "../lib/structures/MusicCommand";
import { KlasaMessage } from "klasa";
export default class extends MusicCommand {
    run(message: KlasaMessage): Promise<any>;
}
