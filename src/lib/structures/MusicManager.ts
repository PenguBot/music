import { MusicInterface } from "./MusicInterface";
import { KlasaGuild as Guild } from "klasa";
import { Collection } from "discord.js";

export class MusicManager extends Collection<string, MusicInterface> {

    public add(guild: Guild): MusicInterface {
        if (!(guild instanceof Guild)) throw "Guild must be an instance of Guild.";
        if (this.has(guild.id)) return this.get(guild.id)!;
        const guildInterface = new MusicInterface(guild);
        this.set(guild.id, guildInterface);
        return guildInterface;
    }

}
