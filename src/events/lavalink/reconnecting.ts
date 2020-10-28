import { Event, EventOptions } from "@pengubot/klasa";
import { ApplyOptions } from "../../lib/utils/Decorators";
import { LavalinkNode } from "@lavacord/discord.js";

@ApplyOptions<EventOptions>({ emitter: "lavalink" })
export default class extends Event {

    public async run(node: LavalinkNode): Promise<void> {
        this.client.console.log(`Lavalink Node "${node.id}" is reconnecting.`);
    }

}
