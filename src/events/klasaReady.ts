import { Event, EventOptions } from "klasa";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<EventOptions>({ once: true })
export default class extends Event {

    public async run(): Promise<void> {
        await this.client.lavalink.connect();
    }

}
