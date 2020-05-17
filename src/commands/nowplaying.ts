import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Get the current song's information.",
    music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY"]
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        const { music } = message.guild!;
        const [song] = music.queue;
        const playString = ["> ▶️ __**Now Playing:**__",
            `**Title:** ${song.title}`,
            `**Author:** ${song.author}`,
            `**Length:** ${song.stream ? "Live Stream" : music.currentTimeString!}`,
            `**Requested By:** ${song.requester}`,
            `**Link:** <${song.url}>`];
        await music.textChannel!.send(playString.join("\n> "));
    }

}
