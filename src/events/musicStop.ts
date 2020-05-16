import { Event, KlasaGuild } from "klasa";

export default class extends Event {

    public async run(guild: KlasaGuild): Promise<void> {
        const { music } = guild;
        await music.leave();
        await music.destroy();
        await music.textChannel!.send("> ⏹️ Queue has finished playing, stopping music and leaving voice channel!");
    }

}
