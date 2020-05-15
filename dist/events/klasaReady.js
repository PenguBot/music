"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    constructor(store, file, directory) {
        super(store, file, directory, { once: true });
    }
    async run() {
        await this.client.lavalink.connect();
    }
}
exports.default = default_1;
//# sourceMappingURL=klasaReady.js.map