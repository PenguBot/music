import { CommandStore, KlasaMessage } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
import { MusicCommand } from "../lib/structures/MusicCommand";

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
        if (!music.voiceChannel && message.member?.voice.channel) await music.join(message.member?.voice.channel.id);

        music.textChannelID = message.channel.id;
        music.add(message.author, song);
        if (!music.playing) await music.play();
    }

}
