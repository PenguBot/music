import { Event } from "klasa";
import { VoiceStateUpdate } from "@lavacord/discord.js";
export default class extends Event {
    run(data: VoiceStateUpdate): Promise<void>;
}
