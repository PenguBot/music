"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicCommand_1 = require("../lib/structures/MusicCommand");
class default_1 extends MusicCommand_1.MusicCommand {
    constructor(store, file, directory) {
        super(store, file, directory, {
            description: "Stop Music",
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY"]
        });
    }
    async run(message) {
        this.client.emit("musicStop", message.guild);
    }
}
exports.default = default_1;
//# sourceMappingURL=stop.js.map