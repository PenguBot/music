"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const discord_js_1 = require("@lavacord/discord.js");
const utils_1 = require("../lib/utils/utils");
const constants_1 = require("../lib/utils/constants");
class default_1 extends klasa_1.Argument {
    async run(arg, _, message) {
        arg = arg.replace(/<(.+)>/g, "$1");
        if (constants_1.SPOTIFY_TRACK.test(arg))
            return this.spotifyTrack(message, arg);
        if (constants_1.SPOTIFY_ALBUM.test(arg) || constants_1.SPOTIFY_PLAYLIST.test(arg))
            return this.spotify(message, arg);
        const validLink = utils_1.isLink(arg);
        if (validLink) {
            if (constants_1.DUMP.test(arg))
                return this.dump(message, arg);
            return this.fetchTracks(arg);
        }
        if (constants_1.WILDCARD.test(arg) && !validLink)
            return this.fetchTracks(arg);
        if (!validLink)
            return this.search(message, arg);
        throw "I could not find any search results, please try again later!";
    }
    async search(message, arg) {
        const data = await this.fetchTracks(`ytsearch:${arg}`);
        if (!data.tracks.length)
            throw "No search results found for this argument.";
        const strippedList = data.tracks.slice(0, 5);
        const searchmsg = [
            "> 🎵 | __**Select a Song**__",
            `> ${strippedList.map((song, index) => `➡ \`${++index}\` ${song.info.title} - ${song.info.author} (${utils_1.getTimeString(song.info.length)})`).join("\n> ")}`,
            `> ${message.author}, Please select a track by replying from range \`1-5\` to add it to the queue.`
        ];
        const selectionMessage = await message.prompt(searchmsg.join("\n"), 15000);
        const selection = Number(selectionMessage.content);
        if (isNaN(selection) || selection < 1 || selection > 5)
            throw "Invalid Option Selected, please select one number between `1-5`. Cancelled song selection.";
        if (!strippedList[selection - 1])
            throw "Specified track could not be loaded, please try again with a different one.";
        return { loadType: data.loadType, playlistInfo: data.playlistInfo, tracks: [strippedList[selection - 1]] };
    }
    async dump(message, arg) {
        const tracks = await utils_1.fetch(`https://paste.pengubot.com/raw/${constants_1.DUMP.exec(arg)[1]}`, "json");
        if (!tracks)
            throw message.language.get("ER_MUSIC_NF");
        return { loadType: discord_js_1.LoadType.PLAYLIST_LOADED, playlistInfo: { name: "PenguBot Dump" }, tracks };
    }
    async spotify(message, arg) {
        const endpoint = constants_1.SPOTIFY_ALBUM.test(arg) ? "albums" : "playlists";
        const id = endpoint.startsWith("a") ? constants_1.SPOTIFY_ALBUM.exec(arg)[1] : constants_1.SPOTIFY_PLAYLIST.exec(arg)[1];
        const data = await utils_1.fetch(`https://api.spotify.com/v1/${endpoint}/${id}`, { headers: { Authorization: `Bearer ${this.client.options.music.spotify.token}` } }, "json");
        if (!data || !data.tracks || !data.tracks.items)
            throw message.language.get("ER_MUSIC_NF");
        await message.channel.send(`***🔄 ${data.name} is loading from Spotify...***`);
        const tracks = [];
        if (endpoint.startsWith("a")) {
            for (const track of data.tracks.items) {
                const res = await this.fetchTracks(`ytsearch:${data.artists[0].name || ""} ${track.title || track.name} audio`);
                if (!res.tracks.length)
                    continue;
                tracks.push(res.tracks[0]);
            }
        }
        else {
            for (const { track } of data.tracks.items) {
                const res = await this.fetchTracks(`ytsearch:${track.artists[0].name || ""} ${track.title || track.name} audio`);
                if (!res.tracks.length)
                    continue;
                tracks.push(res.tracks[0]);
            }
        }
        if (!tracks.length)
            throw "For some reason, I couldn't find alternatives for these tracks on YouTube, sorry!";
        return { loadType: discord_js_1.LoadType.PLAYLIST_LOADED, playlistInfo: { name: data.name }, tracks };
    }
    async spotifyTrack(message, arg) {
        const data = await utils_1.fetch(`https://api.spotify.com/v1/tracks/${constants_1.SPOTIFY_TRACK.exec(arg)[1]}`, { headers: { Authorization: `Bearer ${this.client.options.music.spotify.token}` } }, "json");
        if (!data)
            throw message.language.get("ER_MUSIC_NF");
        const [artist] = data.artists;
        const searchResult = await this.fetchTracks(`ytsearch:${artist ? artist.name : ""} ${data.name} audio`);
        if (!searchResult.tracks.length)
            throw message.language.get("ER_MUSIC_NF");
        return { loadType: discord_js_1.LoadType.TRACK_LOADED, playlistInfo: {}, tracks: [searchResult.tracks[0]] };
    }
    async fetchTracks(arg) {
        const result = await discord_js_1.Rest.load(this.client.lavalink.idealNodes[0], arg);
        if (result.loadType === "LOAD_FAILED")
            throw "There was an error trying to search for that song.";
        if (result.loadType === "NO_MATCHES")
            throw "No tracks or playlists could be found with the given argument.";
        return result;
    }
}
exports.default = default_1;
//# sourceMappingURL=song.js.map