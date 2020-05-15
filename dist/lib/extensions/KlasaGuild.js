"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
discord_js_1.Structures.extend("Guild", Guild => {
    class KlasaGuild extends Guild {
        get music() {
            return this.client.music.add(this);
        }
    }
    return KlasaGuild;
});
//# sourceMappingURL=KlasaGuild.js.map