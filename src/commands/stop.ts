import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Stop Music",
    music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "DJ_MEMBER"]
})
export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<KlasaMessage> {
        const { music } = message.guild!;
        await music.destroy();
        return message.send("> ⏹️ Succesfully stopped playing music!");
    }

}
