import { Event, EventOptions } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
import { ApplyOptions } from "../../lib/utils/Decorators";
import { Message } from "discord.js";
import { MusicInterface } from "../../lib/structures/MusicInterface";

@ApplyOptions<EventOptions>({ name: "musicAdd" })
export default class extends Event {

    public async run(music: MusicInterface, data: TrackResponse): Promise<Message | void> {
        if (data.playlistInfo.name) return music.textChannel!.send(`> **${data.tracks.length} songs** from the playlist **${data.playlistInfo.name}** have been added to the queue.`);

        if (music.queue.length < 2) return;
        const [song] = music.queue;
        const addString = [
            "> 🗒️ __**Added To Queue:**__",
            `**Title:** ${song.title}`,
            `**Author:** ${song.author}`,
            `**Length:** ${song.friendlyDuration}`,
            `**Requested By:** ${song.requester.tag}`,
            `**Link:** <${song.url}>`];
        return music.textChannel!.send(addString.join("\n> "));
    }

}
