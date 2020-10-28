import { Event, EventOptions } from "@pengubot/klasa";
import { ApplyOptions } from "../../lib/utils/Decorators";
import { LavalinkNode, WebsocketCloseEvent } from "@lavacord/discord.js";

@ApplyOptions<EventOptions>({ emitter: "lavalink" })
export default class extends Event {

    public async run(eventData: WebsocketCloseEvent, node: LavalinkNode): Promise<void> {
        this.client.console.error(`Lavalink Node "${node.id}" Disconnected\nwasClean: ${eventData.wasClean} | Code: ${eventData.code} | Reason: ${eventData.reason}`);
    }

}
