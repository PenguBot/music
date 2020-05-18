import { KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
export default class extends MusicCommand {
    run(message: KlasaMessage): Promise<KlasaMessage>;
}
