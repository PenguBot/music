import { MusicInterface } from "./MusicInterface";
import { KlasaGuild as Guild } from "klasa";
import { Collection } from "discord.js";
export declare class MusicManager extends Collection<string, MusicInterface> {
    add(guild: Guild): MusicInterface;
}
