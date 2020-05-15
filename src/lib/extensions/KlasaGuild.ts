import { Structures } from "discord.js";
import { MusicInterface } from "../structures/MusicInterface";
import { MusicClient } from "../Client";

Structures.extend("Guild", Guild => {
    class KlasaGuild extends Guild {

        public get music(): MusicInterface {
            return this.client.music.add(this);
        }

    }
    return KlasaGuild;
});

declare module "discord.js" {
    interface Guild {
        music: MusicInterface;
        client: MusicClient;
    }
}
