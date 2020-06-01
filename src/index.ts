import { Client as KlasaClient } from "klasa";
import { MusicClient as Client } from "./lib/Client";

export { Client };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
module.exports[KlasaClient.plugin] = Client[KlasaClient.plugin];
