"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Extendable {
    constructor(store, file, directory) {
        super(store, file, directory, { appliesTo: [klasa_1.KlasaGuild] });
    }
    get music() {
        const typedThis = this;
        return this.client.music.add(typedThis);
    }
}
exports.default = default_1;
//# sourceMappingURL=KlasaGuild.js.map