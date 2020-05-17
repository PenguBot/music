import { Event, KlasaGuild } from "klasa";
export default class extends Event {
    run(guild: KlasaGuild): Promise<void>;
}
