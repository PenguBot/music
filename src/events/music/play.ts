import { Event, EventOptions } from "klasa";
import { ApplyOptions } from "../../lib/utils/Decorators";
import { Message } from "discord.js";
import { MusicInterface } from "../../lib/structures/MusicInterface";

@ApplyOptions<EventOptions>({ name: "musicPlay" })
export default class extends Event {

    public async run(music: MusicInterface): Promise<Message | void> {
        if (!music.looping) {
            const [song] = music.queue;
            const playString = [
                "> ▶️ __**Now Playing:**__",
                `**Title:** ${song.title}`,
                `**Author:** ${song.author}`,
                `**Length:** ${song.friendlyDuration}`,
                `**Requested By:** ${song.requester}`,
                `**Link:** <${song.url}>`];
            return music.textChannel!.send(playString.join("\n> "));
        }
    }

}
