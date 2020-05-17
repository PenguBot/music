import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Pause or Resume Music.",
    aliases: ["resume", "togglepause"],
    music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER"]

})

export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        const { music } = message.guild!;
        music.pause();
        return message.channel.send(`> ⏯️ Music is now **${!music.paused ? "Playing" : "Paused"}.**`);
    }

}
