import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Pause or Resume Music.",
    aliases: ["resume", "togglepause"],
    music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "BOT_VOICE_CHANNEL"]
})
export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<KlasaMessage> {
        const { music } = message.guild!;
        if (!music.player) throw "There's currently no music playing.";
        await music.pause();
        return message.send(`> ⏯️ Music is now **${!music.paused ? "Playing" : "Paused"}.**`);
    }

}
