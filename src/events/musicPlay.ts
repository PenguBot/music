import { Event, KlasaGuild } from "klasa";

export default class extends Event {

    public async run(guild: KlasaGuild): Promise<void> {
        const { music } = guild;
        if (!music.looping) {
            const [song] = music.queue;
            const playString = ["> ▶️ **Now Playing:**",
                `> **Title:** ${song.title}`,
                `> **Author:** ${song.author}`,
                `> **Length:** ${song.friendlyDuration}`,
                `> **Requested By:** ${song.requester}`,
                `> **Link:** <${song.url}>`];
            await music.textChannel!.send(playString.join("\n"));
            music.queue.shift();
        }
    }

}
