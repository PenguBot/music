import { Event } from "klasa";
import { LavalinkNode } from "@lavacord/discord.js";
export default class extends Event {
    run(error: any, node: LavalinkNode): Promise<void>;
}
