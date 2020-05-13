import { Command, CommandStore, CommandOptions } from "klasa";
import { mergeDefault } from "@klasa/utils";

export abstract class MusicCommand extends Command {
    requireMusic: boolean | undefined;
    requireDJ: boolean | undefined;

    protected constructor(store: CommandStore, file: string[], directory: string, options: MusicCommandOptions = {}) {
        mergeDefault({ runIn: ["text"], requireMusic: true, requireDJ: false }, options);
        super(store, file, directory, options);

        this.requireMusic = options.requireMusic;
        this.requireDJ = options.requireDJ;
    }
}

interface MusicCommandOptions extends CommandOptions {
    requireMusic?: boolean;
    requireDJ?: boolean;
}
