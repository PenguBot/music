import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Stop Music",
    music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY"]
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        return this.client.emit("musicStop", message.guild);
    }

}
