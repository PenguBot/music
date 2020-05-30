"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MusicCommand_1 = require("../lib/structures/MusicCommand");
const Decorators_1 = require("../lib/utils/Decorators");
const discord_js_1 = require("discord.js");
const utils_1 = require("../lib/utils/utils");
const cheerio_1 = __importDefault(require("cheerio"));
let default_1 = (() => {
    let default_1 = class extends MusicCommand_1.MusicCommand {
        async run(message, [song]) {
            const { music } = message.guild;
            if (!song) {
                if (!music.queue.length)
                    return message.send("No music is playing right now, please enter a song name you want lyrics for.");
                song = music.queue[0].title;
            }
            const req = await this.getGeniusLyrics(`search?q=${encodeURIComponent(song)}`, this.client.options.music.lyrics);
            const lyricdata = req.response.hits[0];
            if (!lyricdata)
                return message.send("The provided song could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");
            const picture = lyricdata.result.song_art_image_thumbnail_url;
            const extendedsong = lyricdata.result.title_with_featured;
            const artist = lyricdata.result.primary_artist.name;
            const lyricsbody = await this.scrapeLyrics(lyricdata.result.url);
            if (!lyricsbody)
                return message.send("The provided song's lyrics could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");
            return message.sendEmbed(new discord_js_1.MessageEmbed()
                .setColor("#428bca")
                .setAuthor(`${extendedsong} - ${artist} | Lyrics`, this.client.user.displayAvatarURL(), `http://genius.com/${encodeURIComponent(lyricdata.result.path)}`)
                .setTimestamp()
                .setFooter("© PenguBot.com")
                .setDescription(lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody)
                .setThumbnail(picture));
        }
        async getGeniusLyrics(path, key) {
            return utils_1.fetch(`https://api.genius.com/${path}`, { headers: { Authorization: `Bearer ${key}` } })
                .catch(error => console.error(`[MUSIC ERROR] lyrics\n${error}`));
        }
        async scrapeLyrics(url) {
            const data = await utils_1.fetch(url, "text");
            const $ = cheerio_1.default.load(data);
            const lyrics = $(".lyrics");
            return lyrics ? lyrics.text().trim() : null;
        }
        async init() {
            if (!this.client.options.music.lyrics)
                this.disable();
            return Promise.resolve();
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({
            description: "Get lyrics for the current song or any song by name.",
            usage: "[song:string]",
            aliases: ["repeat", "loopsong"],
            requiredPermissions: ["EMBED_LINKS"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=lyrics.js.map