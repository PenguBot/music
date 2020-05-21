"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MusicCommand_1 = require("../lib/structures/MusicCommand");
const discord_js_1 = require("discord.js");
const Decorators_1 = require("../lib/utils/Decorators");
const klasa_1 = require("klasa");
let default_1 = (() => {
    let default_1 = class extends MusicCommand_1.MusicCommand {
        async run(message) {
            const { music } = message.guild;
            const pages = new klasa_1.RichDisplay(new discord_js_1.MessageEmbed()
                .setAuthor(`${message.guild.name} Music Queue`, "https://i.imgur.com/IS8hX4t.png")
                .setDescription("Use the reactions to change pages, select a page, or stop viewing the queue.")
                .setColor("#428bca"));
            for (let i = 0; i < music.queue.length; i += 12) {
                const curr = music.queue.slice(i, i + 12);
                pages.addPage((t) => t.setDescription(curr.map(y => `\`${music.queue.findIndex(s => s.id === y.id) + 1}\` [${y.title.replace(/\*/g, "\\*")}](${y.url}) (${y.friendlyDuration})`).join("\n")));
            }
            await pages.run(await message.sendMessage("🔃 Loading Queue..."), {
                time: 120000,
                filter: (reaction, user) => user === message.author
            });
        }
    };
    default_1 = __decorate([
        Decorators_1.ApplyOptions({
            description: "List of song's in the current queue.",
            music: ["BOT_VOICE_CHANNEL", "QUEUE_NOT_EMPTY"],
            requiredPermissions: ["EMBED_LINKS", "MANAGE_MESSAGES"]
        })
    ], default_1);
    return default_1;
})();
exports.default = default_1;
//# sourceMappingURL=queue.js.map