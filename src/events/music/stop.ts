import { Event, KlasaGuild, EventOptions } from "klasa";
import { ApplyOptions } from "../../lib/utils/Decorators";

@ApplyOptions<EventOptions>({ name: "musicStop" })
export default class extends Event {

    public async run(guild: KlasaGuild): Promise<void> {
        const { music } = guild;
        await music.textChannel!.send("> ⏹️ Queue has finished playing, stopping music and leaving voice channel!");
        await music.destroy();
    }

}
