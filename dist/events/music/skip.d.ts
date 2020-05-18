import { Event, KlasaUser } from "klasa";
import { Message } from "discord.js";
import { MusicInterface } from "../../lib/structures/MusicInterface";
export default class extends Event {
    run(music: MusicInterface, skipper: KlasaUser): Promise<Message>;
}
