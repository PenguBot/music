import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";
import lyrics from "../lib/utils/lyrics";
import { MessageEmbed } from "discord.js";

@ApplyOptions<MusicCommandOptions>({
    description: "Get lyrics for the current song or any song by name.",
    usage: "[song:string]",
    aliases: ["repeat", "loopsong"]
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage, [song]: [string]): Promise<any> {
        const { music } = message.guild!;
        if (!song) {
            if (!music.queue.length) return message.reply("No Music is playing right now, please enter a song name you want lyrics for.");
            song = music.queue[0].title;
        }

        const req = await lyrics.request(`search?q=${encodeURIComponent(song)}`, this.client.options.music.lyrics);
        const lyricdata = req.response.hits[0];
        if (!lyricdata) return message.reply("The provided song could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");

        const picture = lyricdata.result.song_art_image_thumbnail_url;
        const extendedsong = lyricdata.result.title_with_featured;
        const artist = lyricdata.result.primary_artist.name;

        const lyricsbody = await lyrics.scrape(lyricdata.result.url);
        if (!lyricsbody) return message.reply("The provided song's lyrics could not be found. Please try again with a different one or contact us at <https://discord.gg/6KpTfqR>.");

        const embed = new MessageEmbed()
            .setColor("#428bca")
            .setAuthor(`${extendedsong} - ${artist} | Lyrics`, this.client.user!.avatarURL()!, `http://genius.com/${encodeURIComponent(lyricdata.result.path)}`)
            .setTimestamp()
            .setFooter("© PenguBot.com")
            .setDescription(lyricsbody.length >= 1900 ? `${lyricsbody.substr(0, 1900)}...` : lyricsbody)
            .setThumbnail(picture);

        return message.sendEmbed(embed);
    }

    public async init(): Promise<void> {
        if (!this.client.options.music.lyrics) this.disable();
        return Promise.resolve();
    }

}
