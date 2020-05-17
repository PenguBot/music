/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require("klasa");
const config = require("./config");

Client.use(require("../dist/lib/Client").MusicClient);

const client = new Client({
    prefix: "n!",
    music: { nodes: [
        { host: "127.0.0.1", id: "test", password: "password" }
    ], lyrics: config.lyrics }
});

client.login(config.token);
