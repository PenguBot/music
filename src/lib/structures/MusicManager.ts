import { MusicInterface } from "./MusicInterface";
import { KlasaGuild as Guild } from "klasa";
import { Collection } from "discord.js";

export class MusicManager extends Collection<string, Record<string, any>> {

    private getGuild(guild: Guild): any {
        const data = this.get(guild.id);
        if (typeof guild !== "undefined") return data;
    }

    public add(guild: Guild): MusicInterface {
        if (!(guild instanceof Guild)) throw "The parameter 'Guild' must be a guild instance.";
        if (this.has(guild.id)) return this.getGuild(guild);
        const guildInterface = new MusicInterface(guild);
        this.set(guild.id, guildInterface);
        return guildInterface;
    }

}
