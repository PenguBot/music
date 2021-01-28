"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const MusicCommand_1 = require("../lib/structures/MusicCommand");
const MusicBitField_1 = require("../lib/structures/MusicBitField");
const Decorators_1 = require("../lib/utils/Decorators");
const { FLAGS } = MusicBitField_1.MusicBitField;
let default_1 = class extends klasa_1.Inhibitor {
    async run(message, command) {
        if ((!(command instanceof MusicCommand_1.MusicCommand) || !command.music.bitfield) || message.channel.type !== "text")
            return;
        const { music } = message.guild;
        if (command.music.has(FLAGS.USER_VOICE_CHANNEL) && !message.member.voice.channel)
            throw "You're currently not in a voice channel";
        if (command.music.has(FLAGS.BOT_VOICE_CHANNEL) && !music.guild.me.voice.channel)
            throw "I am not connected to a voice channel.";
        if (command.music.has(FLAGS.HAS_PERMISSION) && !music.hasPermission(message.member))
            throw "I have no permission to view/connect/speak in your voice channel.";
        if (command.music.has(FLAGS.COMMON_VOICE_CHANNEL) && (message.member.voice.channelID !== music.guild.me.voice.channelID))
            throw "You are not in the same voice channel as the bot.";
        if (command.music.has(FLAGS.QUEUE_NOT_EMPTY) && (!music.queue.length || (music.queue[0] ? !music.queue[0].track : false)))
            throw "There are no songs in the queue.";
        if (command.music.has(FLAGS.VOICE_PLAYING) && !music.playing)
            throw "There is currently no music playing.";
        if (command.music.has(FLAGS.VOICE_PAUSED) && !music.paused)
            throw "The music is not paused.";
        if ((command.music.has(FLAGS.DJ_MEMBER) && message.guild.settings.get("toggles.djmode")) && !music.isMemberDJ(message.member))
            throw "You must be a DJ to use this command.";
    }
};
default_1 = __decorate([
    Decorators_1.ApplyOptions({ spamProtection: true })
], default_1);
exports.default = default_1;
//# sourceMappingURL=requireMusic.js.map