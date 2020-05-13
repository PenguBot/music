"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    constructor(store, file, directory) {
        super(store, file, directory, { name: "VOICE_STATE_UPDATE", emitter: "ws" });
    }
    async run(data) {
        const guild = this.client.guilds.get(data.guild_id);
        if (!guild)
            return;
        await guild.members.fetch(data.user_id).catch(() => null);
        guild.voiceStates.add(data);
    }
}
exports.default = default_1;
//# sourceMappingURL=voiceStateUpdate.js.map