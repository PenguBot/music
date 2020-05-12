"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Song {
    constructor(data, requester) {
        this.id = data.info.identifier;
        this.requester = requester;
        this.track = data.track;
        this.title = data.info.title;
        this.author = data.info.author;
        this.seekable = data.info.isSeekable;
        this.stream = data.info.isStream;
        this.length = data.info.length;
        this.position = data.info.position;
    }
    get friendlyDuration() {
        return this.stream ? "Live Stream" : utils_1.getTimeString(this.length);
    }
    get toJSON() {
        return {
            id: this.id,
            requester: this.requester,
            track: this.track,
            title: this.title,
            author: this.author,
            isSeekable: this.seekable,
            isStream: this.stream,
            length: this.length,
            position: this.position,
            timeString: this.friendlyDuration
        };
    }
}
exports.Song = Song;
//# sourceMappingURL=Song.js.map