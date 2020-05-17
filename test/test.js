/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require("klasa");

Client.use(require("../dist/lib/Client").MusicClient);

const client = new Client({
    prefix: "n!",
    music: { nodes: [
        { host: "127.0.0.1", id: "test", password: "password" }
    ] }
});

client.login(require("./config").token);
