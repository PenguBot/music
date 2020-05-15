import { MusicInterface } from "../structures/MusicInterface";
import { MusicClient } from "../Client";
declare module "discord.js" {
    interface Guild {
        music: MusicInterface;
        client: MusicClient;
    }
}
