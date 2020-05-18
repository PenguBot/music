import { Event } from "klasa";
export default class extends Event {
    run(event: any): Promise<void>;
}
