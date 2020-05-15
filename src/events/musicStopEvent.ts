import { Event, KlasaGuild } from "klasa";

export default class extends Event {

    public async run(guild: KlasaGuild): Promise<void> {
        const { music } = guild;
        await music.destroy();
        await music.textChannel?.send("> ⏹️ Music has been stopped!");
    }

}
