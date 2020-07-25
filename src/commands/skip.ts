import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";
import { MusicInterface } from "../lib/structures/MusicInterface";

@ApplyOptions<MusicCommandOptions>({
    aliases: ["skipsong", "repeat"],
    requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
    description: language => language.get("COMMAND_SKIP_DESCRIPTION"),
    music: ["USER_VOICE_CHANNEL", "HAS_PERMISSION", "COMMON_VOICE_CHANNEL", "QUEUE_NOT_EMPTY", "DJ_MEMBER", "VOICE_PLAYING", "BOT_VOICE_CHANNEL"]
})
export default class extends MusicCommand {

    async run(message: KlasaMessage): Promise<any> {
        const { music } = message.guild!;

        if (music.voiceChannel!.members.size > 4) {
            if ("force" in message.flagArgs) {
                if (!music.isMemberDJ(message.member!)) throw "You can't execute this command with the force flag. You must be a DJ.";

                const response = this.handleSkips(music, message.author.id);
                if (response) return message.send(response);
            }
        }

        const [song] = music.queue;
        await music.skip();

        return message.send(`> 🎧 **Skipped Track:** ${song.title}`);
    }

    public handleSkips(musicInterface: MusicInterface, user: string): string | boolean {
        const [song] = musicInterface.queue;
        if (song.skips.has(user)) return "You have already voted to skip this song.";
        song.skips.add(user);
        const members = musicInterface.voiceChannel!.members.size - 1;
        return this.shouldInhibit(members, song.skips.size);
    }

    public shouldInhibit(total: number, size: number): string | boolean {
        if (total <= 3) return true;
        return size >= total * 0.4 ? false : `🔸 | Votes: ${size} of ${Math.ceil(total * 0.4)}`;
    }

}
