import { CommandStore, KlasaMessage } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
import { MusicCommand } from "../lib/structures/MusicCommand";
import { TextChannel } from "discord.js";

export default class extends MusicCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            description: "Play Music",
            usage: "<song:song>",
            music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION"]
        });
    }

    public async run(message: KlasaMessage, [song]: [TrackResponse]): Promise<any> {
        const { music } = message.guild!;
        if (!song.tracks.length) throw "The track could not be found or loaded.";
        if (!message.member) await message.guild!.members.fetch(message.author.id);
        if (!music.voiceChannel && message.member!.voice.channel) await music.join(message.member!.voice.channel.id);

        music["textChannel"] = message.channel as TextChannel;
        music.add(message.author, song);
        if (!music.playing) await music.play();
    }

}
