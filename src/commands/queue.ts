import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { MessageEmbed } from "discord.js";
import { ApplyOptions } from "../lib/utils/Decorators";
import { RichDisplay, KlasaMessage } from "klasa";

@ApplyOptions<MusicCommandOptions>({
    description: "List of song's in the current queue.",
    music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY"],
    requiredPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"]
})
export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        const { music } = message.guild!;

        const pages = new RichDisplay(new MessageEmbed()
            .setAuthor(`${message.guild!.name} Music Queue`, "https://i.imgur.com/IS8hX4t.png")
            .setDescription("Use the reactions to change pages, select a page, or stop viewing the queue.")
            .setColor("#428bca")
        );

        for (let i = 0; i < music.queue.length; i += 12) {
            const curr = music.queue.slice(i, i + 12);
            pages.addPage((t: MessageEmbed) => t.setDescription(curr.map(y => `\`${music.queue.findIndex(s => s.id === y.id) + 1}\` [${y.title.replace(/\*/g, "\\*")}](${y.url}) (${y.friendlyDuration})`).join("\n")));
        }

        await pages.run(await message.sendMessage("🔃 Loading Queue..."), {
            time: 120000,
            filter: (_reaction, user) => user === message.author
        });
    }
}
