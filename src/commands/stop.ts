import { CommandStore, KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            description: "Stop Music",
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY"]
        });
    }

    public async run(message: KlasaMessage): Promise<any> {
        this.client.emit("musicStopEvent", message.guild);
    }

}
