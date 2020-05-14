import { MusicInterface } from "./MusicInterface";
import { KlasaGuild as Guild } from "klasa";
import { Collection } from "discord.js";
export declare class MusicManager extends Collection<string, MusicInterface> {
    get(key: string): MusicInterface | undefined;
    get(guild: Guild): MusicInterface;
    add(guild: Guild): MusicInterface;
}
