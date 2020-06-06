"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicBitField = void 0;
const discord_js_1 = require("discord.js");
let MusicBitField = (() => {
    class MusicBitField extends discord_js_1.BitField {
    }
    MusicBitField.FLAGS = {
        USER_VOICE_CHANNEL: 1 << 0,
        BOT_VOICE_CHANNEL: 1 << 1,
        HAS_PERMISSION: 1 << 2,
        COMMON_VOICE_CHANNEL: 1 << 3,
        QUEUE_NOT_EMPTY: 1 << 4,
        VOICE_PLAYING: 1 << 5,
        VOICE_PAUSED: 1 << 6,
        DJ_MEMBER: 1 << 7
    };
    return MusicBitField;
})();
exports.MusicBitField = MusicBitField;
//# sourceMappingURL=MusicBitField.js.map