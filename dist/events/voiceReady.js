"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const Decorators_1 = require("../lib/utils/Decorators");
let default_1 = class extends klasa_1.Event {
    async run() {
        if (this.client.shard) {
            const shardID = typeof this.client.shard.id !== "undefined" ? this.client.shard.id : this.client.shard.ids[0];
            for (const node of [...this.client.lavalink.nodes.values()])
                if (node.resumeKey)
                    node.resumeKey += `-${shardID}`;
        }
        await this.client.lavalink.connect();
        await this.ensureTask("spotify", "*/30 * * * *");
    }
    ensureTask(name, time) {
        const schedules = this.client.schedule.tasks;
        if (!schedules.some(task => task.taskName === name))
            return this.client.schedule.create(name, time);
    }
};
default_1 = __decorate([
    Decorators_1.ApplyOptions({ event: "klasaReady" })
], default_1);
exports.default = default_1;
//# sourceMappingURL=voiceReady.js.map