import { CommandStore, KlasaMessage, Command } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";

export default class extends Command {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            description: "Play Music",
            usage: "<song:song>"
        });
    }

    public async run(message: KlasaMessage, [song]: [TrackResponse]): Promise<any> {
        const { music } = message.guild!;
        if (!song.tracks.length) throw "The track could not be found or loaded.";
        if (!music.voiceChannel && message.member?.voice.channel) await music.join(message.member?.voice.channel.id);

        music.add(message.author, song);
        music.textChannelID = message.channel.id;
        if (!music.playing) await music.play();
    }

}
