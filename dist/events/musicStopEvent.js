"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild) {
        const { music } = guild;
        await music.destroy();
        const channel = await music.getTextChannel();
        await (channel === null || channel === void 0 ? void 0 : channel.send("> ⏹️ Music has been stopped!"));
    }
}
exports.default = default_1;
//# sourceMappingURL=musicStopEvent.js.map