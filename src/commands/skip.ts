import { CommandStore, KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            description: "Skips Current Song",
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "VOICE_PLAYING"]
        });
    }

    public async run(message: KlasaMessage): Promise<any> {
        await this.client.emit("musicSkip", message.guild, message.author);
    }

}
