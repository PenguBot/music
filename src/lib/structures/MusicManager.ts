import { MusicInterface } from "./MusicInterface";
import { KlasaGuild as Guild } from "klasa";
import { Collection } from "discord.js";

export class MusicManager extends Collection<string, MusicInterface> {

    public get(key: string): MusicInterface | undefined;
    public get(guild: Guild): MusicInterface;
    public get(keyOrGuild: string | Guild): MusicInterface | undefined {
        if (typeof keyOrGuild === "string") return super.get(keyOrGuild);
        return super.get(keyOrGuild.id) ?? this.add(keyOrGuild);
    }

    public add(guild: Guild): MusicInterface {
        const guildInterface = new MusicInterface(guild);
        this.set(guild.id, guildInterface);
        return guildInterface;
    }

}
