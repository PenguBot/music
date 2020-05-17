import { Event, EventOptions } from "klasa";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<EventOptions>({ name: "VOICE_STATE_UPDATE", emitter: "ws" })
export default class extends Event {

    public async run(data: Record<string, any>): Promise<void> {
        const guild = this.client.guilds.get(data.guild_id);
        if (!guild) return;

        await guild.members.fetch(data.user_id).catch(() => null);
        guild.voiceStates.add(data);
    }

}
