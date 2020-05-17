import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Shuffles the current music queue.",
    aliases: ["shufflequeue", "queueshuffle"],
    music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "VOICE_PLAYING"]
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        const { music } = message.guild!;
        if (music.queue.length <= 2) return message.channel.send(`> 🔃 Queue is too small to shuffle.`);
        music.shuffleQueue();
        return message.channel.send(`🔃 Queue has now been shuffled.`);
    }

}
