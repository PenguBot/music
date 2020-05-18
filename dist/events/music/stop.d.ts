import { Event } from "klasa";
import { MusicInterface } from "../../lib/structures/MusicInterface";
export default class extends Event {
    run(music: MusicInterface): Promise<void>;
}
