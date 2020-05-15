import { Event, EventStore } from "klasa";

export default class extends Event {

    public constructor(store: EventStore, file: string[], directory: string) {
        super(store, file, directory, { once: true });
    }

    public async run(): Promise<void> {
        await this.client.lavalink.connect();
    }

}
