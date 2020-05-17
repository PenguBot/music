import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";
import { dump } from "../lib/utils/utils";

@ApplyOptions<MusicCommandOptions>({
    description: "Save current queue in a link for later use.",
    aliases: ["savesongs", "save"],
    music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "USER_VOICE_CHANNEL", "COMMON_VOICE_CHANNEL"]
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        const { music } = message.guild!;
        const save = await dump(JSON.stringify(music.queue));
        return message.channel.send(`> 📁 **The queue is saved:** <${save}>\n> Future usage: \`p!play <the url above>\` to play later!`);
    }

}
