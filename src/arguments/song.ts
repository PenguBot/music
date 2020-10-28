import { Argument, KlasaMessage, Possible } from "@pengubot/klasa";
import { Rest, TrackResponse, TrackData, LoadType } from "@lavacord/discord.js";
import { getTimeString, isLink, fetch } from "../lib/utils/utils";
import { WILDCARD, DUMP, SPOTIFY_ALBUM, SPOTIFY_PLAYLIST, SPOTIFY_TRACK } from "../lib/utils/constants";

export default class extends Argument {

    public async run(arg: string, _: Possible, message: KlasaMessage): Promise<TrackResponse|void> {
        arg = arg.replace(/<(.+)>/g, "$1");

        if (SPOTIFY_TRACK.test(arg)) return this.spotifyTrack(message, arg);
        if (SPOTIFY_ALBUM.test(arg) || SPOTIFY_PLAYLIST.test(arg)) return this.spotify(message, arg);

        const validLink = isLink(arg);
        if (validLink) {
            if (DUMP.test(arg)) return this.dump(message, arg);
            return this.fetchTracks(arg);
        }

        if (WILDCARD.test(arg) && !validLink) return this.fetchTracks(arg);
        if (!validLink) return this.search(message, arg);

        throw "I could not find any search results, please try again later!";
    }

    private async search(message: KlasaMessage, arg: string): Promise<TrackResponse> {
        const data = await this.fetchTracks(`ytsearch:${arg}`);
        if (!data.tracks.length) throw "No search results found for this argument.";

        const strippedList = data.tracks.slice(0, 5);
        const searchmsg = [
            "> 🎵 | __**Select a Song**__",
            `> ${strippedList.map((song, index) => `➡ \`${++index}\` ${song.info.title} - ${song.info.author} (${getTimeString(song.info.length)})`).join("\n> ")}`,
            `> ${message.author}, Please select a track by replying from range \`1-5\` to add it to the queue.`];

        const selectionMessage = await message.prompt(searchmsg.join("\n"), 15000);
        const selection = Number(selectionMessage!.content);

        if (isNaN(selection) || selection < 1 || selection > 5) throw "Invalid Option Selected, please select one number between `1-5`. Cancelled song selection.";
        if (!strippedList[selection - 1]) throw "Specified track could not be loaded, please try again with a different one.";

        return { loadType: data.loadType, playlistInfo: data.playlistInfo, tracks: [strippedList[selection - 1]] };
    }

    private async dump(message: KlasaMessage, arg: string): Promise<TrackResponse> {
        const tracks: TrackData[] = await fetch(`https://paste.pengubot.com/raw/${DUMP.exec(arg)![1]}`, "json");
        if (!tracks) throw message.language.get("ER_MUSIC_NF");

        return { loadType: LoadType.PLAYLIST_LOADED, playlistInfo: { name: "PenguBot Dump" }, tracks };
    }

    private async spotify(message: KlasaMessage, arg: string): Promise<TrackResponse> {
        const endpoint = SPOTIFY_ALBUM.test(arg) ? "albums" : "playlists";
        const id = endpoint.startsWith("a") ? SPOTIFY_ALBUM.exec(arg)![1] : SPOTIFY_PLAYLIST.exec(arg)![1];

        const data = await fetch(`https://api.spotify.com/v1/${endpoint}/${id}`,
            { headers: { Authorization: `Bearer ${this.client.options.music.spotify.token}` } }, "json");
        if (!data || !data.tracks || !data.tracks.items) throw message.language.get("ER_MUSIC_NF");

        await message.channel.send(`***🔄 ${data.name} is loading from Spotify...***`);
        const tracks: TrackData[] = [];

        if (endpoint.startsWith("a")) {
            for (const track of data.tracks.items) {
                const res = await this.fetchTracks(`ytsearch:${data.artists[0].name || ""} ${track.title || track.name} audio`);
                if (!res.tracks.length) continue;
                tracks.push(res.tracks[0]);
            }
        } else {
            for (const { track } of data.tracks.items) {
                const res = await this.fetchTracks(`ytsearch:${track.artists[0].name || ""} ${track.title || track.name} audio`);
                if (!res.tracks.length) continue;
                tracks.push(res.tracks[0]);
            }
        }

        if (!tracks.length) throw "For some reason, I couldn't find alternatives for these tracks on YouTube, sorry!";
        return { loadType: LoadType.PLAYLIST_LOADED, playlistInfo: { name: data.name }, tracks };

    }

    private async spotifyTrack(message: KlasaMessage, arg: string): Promise<TrackResponse> {
        const data = await fetch(`https://api.spotify.com/v1/tracks/${SPOTIFY_TRACK.exec(arg)![1]}`,
            { headers: { Authorization: `Bearer ${this.client.options.music.spotify.token}` } }, "json");
        if (!data) throw message.language.get("ER_MUSIC_NF");

        const [artist] = data.artists;

        const searchResult = await this.fetchTracks(`ytsearch:${artist ? artist.name : ""} ${data.name} audio`);
        if (!searchResult.tracks.length) throw message.language.get("ER_MUSIC_NF");
        return { loadType: LoadType.TRACK_LOADED, playlistInfo: {}, tracks: [searchResult.tracks[0]] };
    }

    private async fetchTracks(arg: string): Promise<TrackResponse> {
        const result = await Rest.load(this.client.lavalink.idealNodes[0], arg);
        if (result.loadType === "LOAD_FAILED") throw "There was an error trying to search for that song.";
        if (result.loadType === "NO_MATCHES") throw "No tracks or playlists could be found with the given argument.";
        return result;
    }

}
