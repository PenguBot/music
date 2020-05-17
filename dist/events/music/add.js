"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
class default_1 extends klasa_1.Event {
    async run(guild, songs, trackres) {
        const { music } = guild;
        if (trackres.playlistInfo) {
            await music.textChannel.send(`> **${songs.length} songs** from the playlist **${trackres.playlistInfo.name}** have been added to the queue.`);
            return;
        }
        const [song] = songs;
        const addString = ["> 🗒️ __**Added To Queue:**__",
            `**Title:** ${song.title}`,
            `**Author:** ${song.author}`,
            `**Length:** ${song.friendlyDuration}`,
            `**Requested By:** ${song.requester}`,
            `**Link:** <${song.url}>`];
        await music.textChannel.send(addString.join("\n> "));
    }
}
exports.default = default_1;
//# sourceMappingURL=add.js.map