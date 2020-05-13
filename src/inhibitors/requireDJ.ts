import { Inhibitor, InhibitorStore, KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";

export default class extends Inhibitor {

    public constructor(store: InhibitorStore, file: string[], directory: string) {
        super(store, file, directory, {
            spamProtection: true
        });
    }

    public async run(message: KlasaMessage, command: MusicCommand): Promise<void> {
        if (!(command instanceof MusicCommand)) return;
        if (!(command.requireDJ ?? message.guild)) return;
        if (message.channel.type !== "text") return;
    }
}
