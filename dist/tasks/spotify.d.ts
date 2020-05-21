import { Task } from "klasa";
export default class extends Task {
    run(): Promise<void>;
    init(): Promise<void>;
}
