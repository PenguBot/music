import { Event, KlasaGuild } from "klasa";

export default class extends Event {

    public async run(guild: KlasaGuild): Promise<void> {
        const { music } = guild;
        if (!music.looping) {
            const [song] = music.queue;
            await music.textChannel!.send(`> ▶️ **Now Playing:** ${song.title} - ${song.author} (<${song.url}>) | **Requested By:** ${song.requester}`);
            music.queue.shift();
        }
    }

}
