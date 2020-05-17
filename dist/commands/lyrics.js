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
const lyrics_1 = __importDefault(require("../lib/utils/lyrics"));
const discord_js_1 = require("discord.js");
let default_1 = (() => {
    let default_1 = class extends MusicCommand_1.MusicCommand {
        async run(message, [song]) {
            const { music } = message.guild;
            if (!song) {
                if (!music.queue.length)
                    return message.reply("No Music is playing right now, please enter a song name you want lyrics for.");
                song = music.queue[0].title;
            }
            const req = await lyrics_1.default.request(`search?q=${encodeURIComponent(song)}`, this.client.options.music.lyrics);
            const lyricdata = req.response.hits[0];
            if (!lyricdata)
                return message.reply("The provided song could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");
            const picture = lyricdata.result.song_art_image_thumbnail_url;
            const extendedsong = lyricdata.result.title_with_featured;
            const artist = lyricdata.result.primary_artist.name;
            const lyricsbody = await lyrics_1.default.scrape(lyricdata.result.url);
            if (!lyricsbody)
                return message.reply("The provided song's lyrics could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");
            const embed = new discord_js_1.MessageEmbed()
                .setColor("#428bca")
                .setAuthor(`${extendedsong} - ${artist} | Lyrics`, this.client.user.avatarURL(), `http://genius.com/${encodeURIComponent(lyricdata.result.path)}`)
                .setTimestamp()
                .setFooter("© PenguBot.com")
                .setDescription(lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody)
                .setThumbnail(picture);
            return message.sendEmbed(embed);
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
            aliases: ["repeat", "loopsong"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=lyrics.js.map