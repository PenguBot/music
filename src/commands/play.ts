import { KlasaMessage } from "klasa";
import { TrackResponse } from "@lavacord/discord.js";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { TextChannel } from "discord.js";
import { ApplyOptions } from "../lib/utils/Decorators";
@ApplyOptions<MusicCommandOptions>({
    description: "Start a party, let's play some music!",
    aliases: ["musicplay"],
    usage: "<song:song>",
    music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION"]
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage, [song]: [TrackResponse]): Promise<any> {
        const { music } = message.guild!;
        if (!message.member) await message.guild!.members.fetch(message.author.id);
        if (!music.voiceChannel && message.member!.voice.channel) await music.join(message.member!.voice.channel.id);

        music["textChannel"] = message.channel as TextChannel;
        music.add(message.author, song);
        if (!music.playing) await music.play();
    }

}
