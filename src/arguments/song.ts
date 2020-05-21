import { Argument, KlasaMessage, Possible } from "klasa";
import { Rest, TrackResponse } from "@lavacord/discord.js";
import { getTimeString, isLink } from "../lib/utils/utils";
import { WILDCARD } from "../lib/utils/constants";

export default class extends Argument {

    public async run(arg: string, _: Possible, message: KlasaMessage): Promise<TrackResponse|void> {
        arg = arg.replace(/<(.+)>/g, "$1");

        const validLink = isLink(arg);
        if (validLink) return this.fetchTracks(arg);

        if (WILDCARD.test(arg) && !validLink) return this.fetchTracks(arg);

        if (!validLink) {
            const data = await this.fetchTracks(`ytsearch:${arg}`);
            if (!data.tracks.length) throw "No search results found for this argument.";

            const strippedList = data.tracks.slice(0, 5);
            const searchmsg = [
                "> 🎵 | __**Select a Song**__",
                `> ${strippedList.map((song, index) => `➡ \`${++index}\` ${song.info.title} - ${song.info.author} (${getTimeString(song.info.length)})`).join("\n> ")}`,
                `> ${message.author}, Please select a track by replying from range \`1-5\` to add it to the queue.`];

            const selectionMessage = await message.prompt(searchmsg.join("\n"), 15000);
            const selection = Number(selectionMessage!.content);

            if (isNaN(selection) || selection < 1 || selection > 5) throw `Invalid Option Selected, please select one number between \`1-5\`. Cancelled song selection.`;
            if (!strippedList[selection - 1]) throw `Specified track could not be found, please try again with a different one.`;

            return { loadType: data.loadType, playlistInfo: data.playlistInfo, tracks: [strippedList[selection - 1]] };
        }

        throw "I could not find any search results, please try again later!";
    }

    public async fetchTracks(arg: string): Promise<TrackResponse> {
        const result = await Rest.load(this.client.lavalink.idealNodes[0], arg);
        if (result.loadType === "LOAD_FAILED") throw "There was an error trying to search for that song.";
        if (result.loadType === "NO_MATCHES") throw "No tracks or playlists could be found with the given argument.";
        return result;
    }

}
