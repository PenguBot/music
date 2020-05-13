"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const MusicCommand_1 = require("../lib/structures/MusicCommand");
class default_1 extends klasa_1.Inhibitor {
    constructor(store, file, directory) {
        super(store, file, directory, {
            spamProtection: true
        });
    }
    async run(message, command) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!(command instanceof MusicCommand_1.MusicCommand))
            return;
        if (!((_a = command.requireMusic) !== null && _a !== void 0 ? _a : message.guild))
            return;
        if (message.channel.type !== "text")
            return;
        if (!((_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.has(message.author.id)))
            await ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.fetch(message.author));
        const { music } = message.guild;
        if (!((_d = message.member) === null || _d === void 0 ? void 0 : _d.voice.channel))
            throw "You are not connected in a voice channel.";
        if (!music.voiceChannel)
            throw "I am not connected in a voice channel.";
        if (((_e = message.member) === null || _e === void 0 ? void 0 : _e.voice.channel) !== ((_g = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.me) === null || _g === void 0 ? void 0 : _g.voice.channel))
            throw "You must be in the same voice channel as me.";
        if (!music.queue.length)
            throw "There are no songs in the queue.";
    }
    async init() {
        await this.client.lavalink.connect();
        return Promise.resolve();
    }
}
exports.default = default_1;
//# sourceMappingURL=requireMusic.js.map