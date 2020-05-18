import { Event } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
import { Message } from "discord.js";
import { MusicInterface } from "../../lib/structures/MusicInterface";
export default class extends Event {
    run(music: MusicInterface, data: TrackResponse): Promise<Message | void>;
}
