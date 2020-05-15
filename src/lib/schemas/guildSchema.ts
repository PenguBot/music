import { MusicClient } from "../Client";

module.exports = MusicClient.defaultGuildSchema
    .add("toggles", folder => folder
        .add("djmode", "boolean", { default: false }))
    .add("roles", roles => roles
        .add("dj", "role"))
    .add("users", folder => folder
        .add("dj", "user", { array: true }));
