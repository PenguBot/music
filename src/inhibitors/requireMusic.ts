import { Inhibitor, InhibitorStore, KlasaMessage } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
import { MusicInterface } from "../lib/structures/MusicInterface";
import { Manager } from "@lavacord/discord.js";

export default class extends Inhibitor {

    public constructor(store: InhibitorStore, file: string[], directory: string) {
        super(store, file, directory, {
            spamProtection: true
        });
    }

    public async run(message: KlasaMessage, command: MusicCommand): Promise<void> {
        if (!(command.requireMusic ?? message.guild)) return;
        if (message.channel.type !== "text") return;
        if (!message.guild?.members.has(message.author.id)) await message.guild?.members.fetch(message.author);

        const { music } = message.guild!;
        if (!message.member?.voice.channel) throw "You are not connected in a voice channel.";
        if (!music.voiceChannel) throw "I am not connected in a voice channel.";
        if (message.member?.voice.channel !== message.guild?.me?.voice.channel) throw "You must be in the same voice channel as me.";
        if (!music.queue.length) throw "There are no songs in the queue.";
    }

    public async init(): Promise<void> {
        await this.client.lavalink.connect();
        return Promise.resolve();
    }
}

declare module "discord.js" {
    interface Guild {
        music: MusicInterface;
    }
}

declare module "klasa" {
    interface Client {
        lavalink: Manager;
    }
}
