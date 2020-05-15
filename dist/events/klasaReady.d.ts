import { Event, EventStore } from "klasa";
export default class extends Event {
    constructor(store: EventStore, file: string[], directory: string);
    run(): Promise<void>;
}
