"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MusicCommand_1 = require("../lib/structures/MusicCommand");
class default_1 extends MusicCommand_1.MusicCommand {
    constructor(store, file, directory) {
        super(store, file, directory, {
            description: "Skips Current Song",
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "VOICE_PLAYING"]
        });
    }
    async run(message) {
        await this.client.emit("musicSkip", message.guild, message.author);
    }
}
exports.default = default_1;
//# sourceMappingURL=skip.js.map