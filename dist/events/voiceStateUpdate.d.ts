import { Event, EventStore } from "klasa";
export default class extends Event {
    constructor(store: EventStore, file: string[], directory: string);
    run(data: Record<string, any>): Promise<void>;
}
