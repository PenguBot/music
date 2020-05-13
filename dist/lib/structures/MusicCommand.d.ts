import { Command, CommandStore, CommandOptions } from "klasa";
export declare abstract class MusicCommand extends Command {
    requireMusic: boolean | undefined;
    requireDJ: boolean | undefined;
    protected constructor(store: CommandStore, file: string[], directory: string, options?: MusicCommandOptions);
}
interface MusicCommandOptions extends CommandOptions {
    requireMusic?: boolean;
    requireDJ?: boolean;
}
export {};
