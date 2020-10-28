import { Task } from "@pengubot/klasa";
import { fetch } from "../lib/utils/utils";

export default class extends Task {

    async run(): Promise<void> {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${this.client.options.music.spotify.buffer}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        this.client.options.music.spotify.token = res.access_token;
    }

    async init(): Promise<any> {
        if (!this.client.options.music.spotify?.buffer) return this.disable();
        return this.run();
    }

}
