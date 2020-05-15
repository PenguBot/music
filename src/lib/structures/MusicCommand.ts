import { Command, CommandStore, CommandOptions } from "klasa";
import { mergeDefault } from "@klasa/utils";
import { MusicBitField, MusicBitFieldString } from "./MusicBitField";
import { BitFieldResolvable } from "discord.js";

export abstract class MusicCommand extends Command {

    public music: MusicBitField;

    protected constructor(store: CommandStore, file: string[], directory: string, options: MusicCommandOptions = {}) {
        mergeDefault({ runIn: ["text"], requireMusic: true, requireDJ: false }, options);
        super(store, file, directory, options);

        this.music = new MusicBitField(options.music);
    }
}

interface MusicCommandOptions extends CommandOptions {
    music?: BitFieldResolvable<MusicBitFieldString>;
}
