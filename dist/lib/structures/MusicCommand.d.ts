import { Command, CommandStore, CommandOptions } from "klasa";
import { MusicBitField, MusicBitFieldString } from "./MusicBitField";
import { BitFieldResolvable } from "discord.js";
export declare abstract class MusicCommand extends Command {
    music: MusicBitField;
    protected constructor(store: CommandStore, file: string[], directory: string, options?: MusicCommandOptions);
}
export interface MusicCommandOptions extends CommandOptions {
    music?: BitFieldResolvable<MusicBitFieldString>;
}
