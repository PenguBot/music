import { KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
import { MusicInterface } from "../lib/structures/MusicInterface";
export default class extends MusicCommand {
    run(message: KlasaMessage): Promise<any>;
    handleSkips(musicInterface: MusicInterface, user: string): string | boolean;
    shouldInhibit(total: number, size: number): string | boolean;
}
