"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Inhibitor {
    constructor(store, file, directory) {
        super(store, file, directory, {
            spamProtection: true
        });
    }
    async run(message, command) {
        var _a;
        if (!((_a = command.requireDJ) !== null && _a !== void 0 ? _a : message.guild))
            return;
        if (message.channel.type !== "text")
            return;
    }
}
exports.default = default_1;
//# sourceMappingURL=requireDJ.js.map