import { Event } from "klasa";
export default class extends Event {
    run(): Promise<void>;
}
