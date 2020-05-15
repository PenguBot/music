"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
module.exports = klasa_1.Client.defaultGuildSchema
    .add("toggles", folder => folder
    .add("djmode", "boolean", { default: false }))
    .add("roles", roles => roles
    .add("dj", "role"))
    .add("users", folder => folder
    .add("dj", "user", { array: true }));
//# sourceMappingURL=defaultGuildSchema.js.map