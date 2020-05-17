import { Event, KlasaGuild, KlasaUser } from "klasa";
export default class extends Event {
    run(guild: KlasaGuild, skipper: KlasaUser): Promise<any>;
}
