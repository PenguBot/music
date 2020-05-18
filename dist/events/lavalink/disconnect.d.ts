import { Event } from "klasa";
import { LavalinkNode, WebsocketCloseEvent } from "@lavacord/discord.js";
export default class extends Event {
    run(eventData: WebsocketCloseEvent, node: LavalinkNode): Promise<void>;
}
