/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require("klasa");
const config = require("./config");

Client.use(require("../dist/lib/Client").MusicClient);

const client = new Client({
    prefix: "t!",
    music: { nodes: [{ id: "eu", host: "localhost", port: 2333, password: config.password, reconnectInterval: 30000, resumeKey: "pengu-music" }], lyrics: config.lyrics, spotify: { buffer: config.spotify, token: "" } },
    createPiecesFolders: false,
    commandEditing: true,
    owners: ["136549806079344640"]
});

client.login(config.token);
