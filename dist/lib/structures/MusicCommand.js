"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicCommand = void 0;
const klasa_1 = require("klasa");
const utils_1 = require("@klasa/utils");
const MusicBitField_1 = require("./MusicBitField");
class MusicCommand extends klasa_1.Command {
    constructor(store, file, directory, options = {}) {
        utils_1.mergeDefault({ runIn: ["text"], requireMusic: true, requireDJ: false }, options);
        super(store, file, directory, options);
        this.music = new MusicBitField_1.MusicBitField(options.music);
    }
}
exports.MusicCommand = MusicCommand;
//# sourceMappingURL=MusicCommand.js.map