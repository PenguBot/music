import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Loop the current song or queue.",
    usage: "[volume:integer]",
    aliases: ["repeat", "loopsong"],
    music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "VOICE_PLAYING", "USER_VOICE_CHANNEL", "COMMON_VOICE_CHANNEL", "DJ_MEMBER"]
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage, [volume]: [number]): Promise<any> {
        const { music } = message.guild!;

        if (!volume) return message.send(`> 🔈 **Current player volume is:** ${music.volume}%`);
        if (volume < 1 || volume > 100) return message.channel.send(`> 🔈 **Volume can not be lower than 1 or higher than 100.**`);

        await music.setVolume(volume);
        return message.channel.send(`> 🔈 **Volume has now been updated to:** ${volume}%`);
    }

}
