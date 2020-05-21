"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const utils_1 = require("../lib/utils/utils");
class default_1 extends klasa_1.Task {
    async run() {
        const res = await utils_1.fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${this.client.options.music.spotify.buffer}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        this.client.options.music.spotify.token = res.access_token;
    }
    async init() {
        var _a;
        if (!this.client.settings.get("schedules").some((task) => task.taskName === "spotify"))
            await this.client.schedule.create("spotify", "*/30 * * * *");
        if (!((_a = this.client.options.music.spotify) === null || _a === void 0 ? void 0 : _a.buffer)) {
            this.disable();
            return Promise.resolve();
        }
        return this.run();
    }
}
exports.default = default_1;
//# sourceMappingURL=spotify.js.map