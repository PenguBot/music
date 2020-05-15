"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild) {
        var _a;
        const { music } = guild;
        await music.destroy();
        await ((_a = music.textChannel) === null || _a === void 0 ? void 0 : _a.send("> ⏹️ Music has been stopped!"));
    }
}
exports.default = default_1;
//# sourceMappingURL=musicStopEvent.js.map