/* eslint-disable @typescript-eslint/no-var-requires */
const { Client } = require("klasa");
const config = require("./config");

Client.use(require("../dist/lib/Client").MusicClient);

const client = new Client({
    prefix: "n!",
    music: { nodes: [{ id: "singapore", host: "localhost", port: 2333, password: "youshallnotpass", reconnectInterval: 30000 }], lyrics: config.lyrics },
    createPiecesFolders: false
});

client.lavalink
    .on("disconnect", d => console.error(d))
    .on("reconnecting", d => console.error(`${d.id} is reconnecting`))
    .on("error", d => console.error(d));

client.login(config.token);
