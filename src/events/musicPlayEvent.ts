import { Event, KlasaGuild } from "klasa";

export default class extends Event {

    public async run(guild: KlasaGuild): Promise<void> {
        const { music } = guild;
        if (!music.looping && music.textChannelID) {
            const [song] = music.queue;
            const channel = await music.getTextChannel();
            await channel?.send(`> ▶️ **Now Playing:** ${song.title} - ${song.author} (<${song.url}>) | **Requested By:** ${song.requester}`);
            music.queue.shift();
        }
    }

}
