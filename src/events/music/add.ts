import { Event, KlasaGuild } from "klasa";
import { Song } from "../../lib/structures/Song";
import { TrackResponse } from "@lavacord/discord.js";

export default class extends Event {

    public async run(guild: KlasaGuild, songs: Song[], trackres: TrackResponse): Promise<void> {
        const { music } = guild;
        if (trackres.playlistInfo) {
            await music.textChannel!.send(`> **${songs.length} songs** from the playlist **${trackres.playlistInfo.name}** have been added to the queue.`);
            return;
        }
        const [song] = songs;
        const addString = ["> 🗒️ __**Added To Queue:**__",
            `**Title:** ${song.title}`,
            `**Author:** ${song.author}`,
            `**Length:** ${song.friendlyDuration}`,
            `**Requested By:** ${song.requester}`,
            `**Link:** <${song.url}>`];
        await music.textChannel!.send(addString.join("\n> "));
    }

}
