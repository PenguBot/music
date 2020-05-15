"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicCommand_1 = require("../lib/structures/MusicCommand");
class default_1 extends MusicCommand_1.MusicCommand {
    constructor(store, file, directory) {
        super(store, file, directory, {
            description: "Stop Music"
        });
    }
    async run(message) {
        this.client.emit("musicStopEvent", message.guild);
    }
}
exports.default = default_1;
//# sourceMappingURL=stop.js.map