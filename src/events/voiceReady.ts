import { Event, EventOptions, ScheduledTask } from "klasa";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<EventOptions>({ event: "klasaReady" })
export default class extends Event {

    public async run(): Promise<void> {
        if (this.client.shard) {
            const shardID = typeof (this.client.shard as any).id !== "undefined" ? (this.client.shard as any).id : this.client.shard.ids[0];
            for (const node of [...this.client.lavalink.nodes.values()]) if (node.resumeKey) node.resumeKey += `-${shardID}`;
        }
        await this.client.lavalink.connect();

        await this.ensureTask("spotify", "*/30 * * * *");
    }

    private ensureTask(name: string, time: string): Promise<ScheduledTask> | void {
        const schedules = this.client.settings!.get("schedules") as any[];
        if (!schedules.some(task => task.taskName === name)) return this.client.schedule.create(name, time);
    }

}
