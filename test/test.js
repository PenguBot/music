/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require("klasa");
const config = require("./config");

Client.use(require("../dist/lib/Client").MusicClient);

const client = new Client({
    prefix: "n!",
    music: { nodes: [{ id: "eu", host: "localhost", port: 2333, password: "password", reconnectInterval: 30000, resumeKey: "pengu-music" }], lyrics: config.lyrics },
    createPiecesFolders: false
});

client.login(config.token);
