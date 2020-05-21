import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    usage: "[volume:integer]",
    description: language => language.get("COMMAND_VOLUME_DESCRIPTION"),
    aliases: ["changevol", "setvolume", "changevolume"],
    music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "VOICE_PLAYING", "USER_VOICE_CHANNEL", "COMMON_VOICE_CHANNEL", "DJ_MEMBER"]
})
export default class extends MusicCommand {

    public async run(message: KlasaMessage, [volume]: [number]): Promise<KlasaMessage> {
        const { music } = message.guild!;

        if (!volume) return message.send(`> 🔈 **Current player volume is:** ${music.volume}`);
        if (volume < 1 || volume > 150) return message.send(`> 🔈 **Volume can not be lower than 1 or higher than 150.**`);

        await music.setVolume(volume);
        return message.send(`> 🔈 **Volume has now been updated to:** ${volume}`);
    }

}
