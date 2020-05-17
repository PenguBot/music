import { MusicInterface } from "../structures/MusicInterface";
declare module "discord.js" {
    interface Guild {
        music: MusicInterface;
    }
}
