import { Event, EventOptions } from "klasa";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<EventOptions>({ name: "ready", once: true })
export default class extends Event {

    public async run(): Promise<void> {
        if (this.client.shard) for (const node of [...this.client.lavalink.nodes.values()]) if (node.resumeKey) node.resumeKey += `-${(this.client.shard as any).id || this.client.shard.ids[0]}`;
        await this.client.lavalink.connect();
    }

}
