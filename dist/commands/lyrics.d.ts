import { KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
export default class extends MusicCommand {
    run(message: KlasaMessage, [song]: [string]): Promise<KlasaMessage>;
    getGeniusLyrics(path: string, key: string): Promise<any>;
    scrapeLyrics(url: string): Promise<string | null>;
    init(): Promise<void>;
}
