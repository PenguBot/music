import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Loop the current song or queue.",
    usage: "[song|queue]",
    aliases: ["repeat", "loopsong"],
    music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "VOICE_PLAYING", "USER_VOICE_CHANNEL", "COMMON_VOICE_CHANNEL", "DJ_MEMBER"]
})

export default class extends MusicCommand {

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async run(message: KlasaMessage, [songOrQueue = "song"]): Promise<KlasaMessage> {
        const { music } = message.guild!;

        if (songOrQueue === "song") {
            music.looping = !music.looping;
            return message.send(`> 🔄 Music is now **${music.looping ? "" : "No Longer"} Looping** in **Song** mode.`);
        }

        music.queue = music.queue.concat(music.queue);
        return message.send(`> 🔄 Music is now **Looping** in **Queue** mode.`);
    }

}
