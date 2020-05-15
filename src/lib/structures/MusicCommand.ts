// Copyright (c) 2019-2020 Antonio Román. All rights reserved. Apache License 2.0.
// Source: https://github.com/skyra-project/skyra

import { Command, CommandStore, CommandOptions } from "klasa";
import { mergeDefault } from "@klasa/utils";
import { MusicBitField, MusicBitFieldString } from "./MusicBitField";
import { BitFieldResolvable } from "discord.js";

export abstract class MusicCommand extends Command {

    public music: MusicBitField;

    protected constructor(store: CommandStore, file: string[], directory: string, options: MusicCommandOptions = {}) {
        mergeDefault({ runIn: ["text"] }, options);
        super(store, file, directory, options);

        this.music = new MusicBitField(options.music);
    }
}

interface MusicCommandOptions extends CommandOptions {
    music?: BitFieldResolvable<MusicBitFieldString>;
}
