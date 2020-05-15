"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../Client");
module.exports = Client_1.MusicClient.defaultGuildSchema
    .add("toggles", folder => folder
    .add("djmode", "boolean", { default: false }))
    .add("roles", roles => roles
    .add("dj", "role"))
    .add("users", folder => folder
    .add("dj", "user", { array: true }));
//# sourceMappingURL=guildSchema.js.map