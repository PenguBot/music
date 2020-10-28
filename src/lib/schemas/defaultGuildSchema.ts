import { Client } from "@pengubot/klasa";

module.exports = Client.defaultGuildSchema
    .add("misc", folder => folder
        .add("volume", "number", { default: 100 }))
    .add("toggles", folder => folder
        .add("djmode", "boolean", { default: false }))
    .add("roles", roles => roles
        .add("dj", "role"))
    .add("users", folder => folder
        .add("dj", "user", { array: true }));
