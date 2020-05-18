import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";
import { MessageEmbed } from "discord.js";
import { fetch } from "../lib/utils/utils";
import cheerio from "cheerio";

@ApplyOptions<MusicCommandOptions>({
    description: "Get lyrics for the current song or any song by name.",
    usage: "[song:string]",
    aliases: ["repeat", "loopsong"]
})
export default class extends MusicCommand {

    public async run(message: KlasaMessage, [song]: [string]): Promise<KlasaMessage> {
        const { music } = message.guild!;
        if (!song) {
            if (!music.queue.length) return message.send("No music is playing right now, please enter a song name you want lyrics for.");
            song = music.queue[0].title;
        }

        const req = await this.getGeniusLyrics(`search?q=${encodeURIComponent(song)}`, this.client.options.music.lyrics);
        const lyricdata = req.response.hits[0];
        if (!lyricdata) return message.send("The provided song could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");

        const picture = lyricdata.result.song_art_image_thumbnail_url;
        const extendedsong = lyricdata.result.title_with_featured;
        const artist = lyricdata.result.primary_artist.name;

        const lyricsbody = await this.scrapeLyrics(lyricdata.result.url);
        if (!lyricsbody) return message.send("The provided song's lyrics could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");

        return message.sendEmbed(new MessageEmbed()
            .setColor("#428bca")
            .setAuthor(`${extendedsong} - ${artist} | Lyrics`, this.client.user!.displayAvatarURL(), `http://genius.com/${encodeURIComponent(lyricdata.result.path)}`)
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription(lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody)
            .setThumbnail(picture));
    }

    public async getGeniusLyrics(path: string, key: string): Promise<any> {
        return fetch(`https://api.genius.com/${path}`, { headers: { Authorization: `Bearer ${key}` } })
            .catch(error => {
                if (error.body.error) throw new Error(`${error.body.error}: ${error.body.error_description}`);
                throw error;
            });
    }

    public async scrapeLyrics(url: string): Promise<string|null> {
        const data = await fetch(url, "text");
        const $ = cheerio.load(data);
        const lyrics = $(".lyrics");
        return lyrics ? lyrics.text().trim() : null;
    }

    public async init(): Promise<void> {
        if (!this.client.options.music.lyrics) this.disable();
        return Promise.resolve();
    }

}
