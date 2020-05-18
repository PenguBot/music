import { Event, EventOptions } from "klasa";
import { ApplyOptions } from "../../lib/utils/Decorators";
import { MusicInterface } from "../../lib/structures/MusicInterface";

@ApplyOptions<EventOptions>({ name: "musicStop" })
export default class extends Event {

    public async run(music: MusicInterface): Promise<void> {
        await music.textChannel!.send("> ⏹️ Queue has finished playing, stopping music and leaving voice channel!");
        await music.destroy();
    }

}
