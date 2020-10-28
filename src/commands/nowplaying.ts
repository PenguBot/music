import { KlasaMessage } from "@pengubot/klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Get the current playing song's information.",
    aliases: ["np", "currentlyplaying", "dmsong", "savesong"],
    music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "VOICE_PLAYING"]
})
export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        const { music } = message.guild!;
        const [song] = music.queue;
        const playString = [
            "> ▶️ __**Now Playing:**__",
            `**Title:** ${song.title}`,
            `**Author:** ${song.author}`,
            `**Length:** ${song.stream ? "Live Stream" : music.currentTimeString!}`,
            `**Requested By:** ${song.requester.tag}`,
            `**Link:** <${song.url}>`];
        if (message.flagArgs.dm) return message.author.send(playString.join("\n")).catch(() => null);
        return message.send(playString.join("\n> "));
    }

}
