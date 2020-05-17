import { Event } from "klasa";
export default class extends Event {
    run(data: Record<string, any>): Promise<void>;
}
