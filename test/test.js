/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require("klasa");
const config = require("./config");

Client.use(require("../dist/lib/Client").MusicClient);

const client = new Client({
    prefix: "n!",
    music: { nodes: [{ id: "eu", host: "localhost", port: 2333, password: "youshallnotpass", reconnectInterval: 30000, resumeKey: "pengu-music" }], lyrics: config.lyrics },
    createPiecesFolders: false,
    commandEditing: true
});

client.login(config.token);
