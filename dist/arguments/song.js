"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const discord_js_1 = require("@lavacord/discord.js");
const utils_1 = require("../lib/utils/utils");
const constants_1 = require("../lib/utils/constants");
class default_1 extends klasa_1.Argument {
    async run(arg, _, message) {
        arg = arg.replace(/<(.+)>/g, "$1");
        const validLink = utils_1.isLink(arg);
        if (validLink)
            return this.fetchTracks(arg);
        if (constants_1.WILDCARD.test(arg) && !validLink)
            return this.fetchTracks(arg);
        if (!validLink) {
            const data = await this.fetchTracks(`ytsearch:${arg}`);
            if (!data.tracks.length)
                throw "No search results found for this argument.";
            const strippedList = data.tracks.slice(0, 5);
            const searchmsg = ["> 🎵 | __**Select a Song**__",
                `> ${strippedList.map((song, index) => `➡ \`${++index}\` ${song.info.title} - ${song.info.author} (${utils_1.getTimeString(song.info.length)})`).join("\n> ")}`,
                `> ${message.author}, Please select a track by replying from range \`1-5\` to add it to the queue.`];
            const selectionMessage = await message.prompt(message, searchmsg.join("\n"), 15000);
            const selection = Number(selectionMessage.content);
            if (isNaN(selection) || selection < 1 || selection > 5)
                throw `Invalid Option Selected, please select one number between \`1-5\`. Cancelled song selection.`;
            if (!strippedList[selection - 1])
                throw `Specified track could not be found, please try again with a different one.`;
            return { loadType: data.loadType, playlistInfo: data.playlistInfo, tracks: [strippedList[selection - 1]] };
        }
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