// Copyright (c) 2019-2020 Antonio Román. All rights reserved. Apache License 2.0.
// Source: https://github.com/skyra-project/skyra

import { Inhibitor, KlasaMessage, Command, InhibitorOptions } from "klasa";
import { MusicCommand } from "../lib/structures/MusicCommand";
import { MusicBitField } from "../lib/structures/MusicBitField";
import { ApplyOptions } from "../lib/utils/Decorators";

const { FLAGS } = MusicBitField;

@ApplyOptions<InhibitorOptions>({ spamProtection: true })
export default class extends Inhibitor {

    public async run(message: KlasaMessage, command: MusicCommand | Command): Promise<void> {
        if ((!(command instanceof MusicCommand) || !command.music.bitfield) || message.channel.type !== "text") return;

        const { music } = message.guild!;
        if (command.music.has(FLAGS.USER_VOICE_CHANNEL) && !message.member!.voice.channel) throw "You're currently not in a voice channel";
        if (command.music.has(FLAGS.BOT_VOICE_CHANNEL) && !music.guild.me!.voice.channel) throw "I am not connected to a voice channel.";
        if (command.music.has(FLAGS.HAS_PERMISSION) && !music.hasPermission(message.member!)) throw "I have no permission to connect or play in your voice channel.";
        if (command.music.has(FLAGS.COMMON_VOICE_CHANNEL) && (message.member!.voice.channelID !== music.guild.me!.voice.channelID)) throw "You are not in the same voice channel as the bot.";
        if (command.music.has(FLAGS.QUEUE_NOT_EMPTY) && !music.queue.length) throw "There are no songs in the queue.";
        if (command.music.has(FLAGS.VOICE_PLAYING) && !music.playing) throw "There is currently no music playing.";
        if (command.music.has(FLAGS.VOICE_PAUSED) && !music.paused) throw "The music is not paused.";
        if (command.music.has(FLAGS.DJ_MEMBER) && !music.isMemberDJ(message.member!)) throw "You must be a DJ to use this command.";
    }

}
