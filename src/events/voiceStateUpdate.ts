import { Event, EventStore } from "klasa";

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, { name: "VOICE_STATE_UPDATE", emitter: "ws" });
    }

    public async run(data: Record<string, any>): Promise<void> {
        const guild = this.client.guilds.get(data.guild_id);
        if (!guild) return;

        await guild.members.fetch(data.user_id).catch(() => null);
        guild.voiceStates.add(data);
    }

}
