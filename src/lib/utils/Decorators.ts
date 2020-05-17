import { PieceOptions, Piece, Store } from "klasa";
import { Constructor } from "discord.js";

export function createClassDecorator(fn: Function): Function {
    return fn;
}

export function ApplyOptions<T extends PieceOptions>(options: T): Function {
    return createClassDecorator((target: Constructor<Piece>) => class extends target {
        public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string) {
            super(store, file, directory, options);
        }
    });
}
