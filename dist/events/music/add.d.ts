import { Event, KlasaGuild } from "klasa";
import { Song } from "../../lib/structures/Song";
import { TrackResponse } from "@lavacord/discord.js";
export default class extends Event {
    run(guild: KlasaGuild, songs: Song[], trackres: TrackResponse): Promise<void>;
}
