import { Extendable, ExtendableStore, KlasaGuild } from "klasa";
import { MusicInterface } from "../lib/structures/MusicInterface";

export default class extends Extendable {

    public constructor(store: ExtendableStore, file: string[], directory: string) {
        super(store, file, directory, { appliesTo: [KlasaGuild] });
    }

    public get music(): MusicInterface {
        const typedThis = this as unknown as KlasaGuild;
        return this.client.music.add(typedThis);
    }

}
