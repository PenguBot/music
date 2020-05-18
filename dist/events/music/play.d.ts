import { Event } from "klasa";
import { Message } from "discord.js";
import { MusicInterface } from "../../lib/structures/MusicInterface";
export default class extends Event {
    run(music: MusicInterface): Promise<Message | void>;
}
