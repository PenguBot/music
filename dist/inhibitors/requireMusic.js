"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const MusicCommand_1 = require("../lib/structures/MusicCommand");
const MusicBitField_1 = require("../lib/structures/MusicBitField");
const { FLAGS } = MusicBitField_1.MusicBitField;
class default_1 extends klasa_1.Inhibitor {
    constructor(store, file, directory) {
        super(store, file, directory, {
            spamProtection: true
        });
    }
    async run(message, command) {
        if ((!(command instanceof MusicCommand_1.MusicCommand) || !command.music.bitfield) || message.channel.type !== "text")
            return;
        const { music } = message.guild;
        if (command.music.has(FLAGS.USER_VOICE_CHANNEL) && !message.member.voice.channel)
            throw "You're currently not in a voice channel";
        if (command.music.has(FLAGS.BOT_VOICE_CHANNEL) && !music.guild.me.voice.channel)
            throw "I am not connected to a voice channel.";
        if (command.music.has(FLAGS.HAS_PERMISSION) && !music.hasPermission(message.member))
            throw "I have no permission to connect or play in your voice channel.";
        if (command.music.has(FLAGS.COMMON_VOICE_CHANNEL) && (message.member.voice.channelID !== music.guild.me.voice.channelID))
            throw "You are not in the same voice channel as the bot.";
        if (command.music.has(FLAGS.QUEUE_NOT_EMPTY) && !music.queue.length)
            throw "There are no songs in the queue.";
        if (command.music.has(FLAGS.VOICE_PLAYING) && !music.playing)
            throw "There is currently no music playing.";
        if (command.music.has(FLAGS.VOICE_PAUSED) && !music.paused)
            throw "The music is not paused.";
        if (command.music.has(FLAGS.DJ_MEMBER) && !music.isMemberDJ(message.member))
            throw "You must be a DJ to use this command.";
    }
    async init() {
        await this.client.lavalink.connect();
        return Promise.resolve();
    }
}
exports.default = default_1;
//# sourceMappingURL=requireMusic.js.map