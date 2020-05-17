"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("@lavacord/discord.js");
discord_js_1.Structures.extend("LavalinkNode", () => {
    class MusicNode extends discord_js_2.LavalinkNode {
        configureResuming(key, timeout = 240) {
            this.resumeKey = key;
            return this.send({ op: "configureResuming", key, timeout });
        }
    }
    return MusicNode;
});
//# sourceMappingURL=LavalinkNode.js.map