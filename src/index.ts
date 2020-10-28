import { Client as KlasaClient } from "@pengubot/klasa";
import { MusicClient as Client } from "./lib/Client";

export { Client };

// @ts-ignore
module.exports[KlasaClient.plugin] = Client[KlasaClient.plugin];
