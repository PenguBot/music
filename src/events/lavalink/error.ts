import { Event, EventOptions } from "klasa";
import { ApplyOptions } from "../../lib/utils/Decorators";
import { LavalinkNode } from "@lavacord/discord.js";

@ApplyOptions<EventOptions>({ emitter: "lavalink" })
export default class extends Event {

    public async run(error: any, node: LavalinkNode): Promise<void> {
        this.client.console.error(`Lavalink Node "${node.id}" errored:`, error);
    }

}
