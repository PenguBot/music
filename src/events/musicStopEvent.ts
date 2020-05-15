import { Event, KlasaGuild } from "klasa";

export default class extends Event {

    public async run(guild: KlasaGuild): Promise<void> {
        const { music } = guild;
        await music.destroy();
        const channel = await music.getTextChannel();
        await channel?.send("> ⏹️ Queue has finished playing, stopping music and leaving voice channel!");
    }

}
