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
                `> **Title:** ${song.title}`,
                `> **Author:** ${song.author}`,
                `> **Length:** ${song.friendlyDuration}`,
                `> **Requested By:** ${song.requester.tag}`,
                `> **Link:** <${song.url}>`,
                " ",
                "> 💟 **We need your help!** Enjoying the music? Consider supporting us on [Patreon](https://patreon.com/join/PenguBot) so we can keep it going."];
            return music.textChannel!.send(playString.join("\n"));
        }
    }

}
