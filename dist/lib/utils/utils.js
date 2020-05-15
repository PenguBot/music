"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.regexes = exports.getTimeString = void 0;
function getTimeString(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
    return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
exports.getTimeString = getTimeString;
function regexes(type) {
    switch (type) {
        case "wildcard": return /(?:scsearch:|ytsearch:).*/i;
        case "exported": return /https:\/\/paste.pengubot.com\/(.*)/i;
        case "spotifyPlaylist": return /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|user\/spotify\/playlist\/|\?uri=spotify:playlist:)([1-z]{22})/i;
        case "spotifyAlbum": return /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/i;
        case "spotifyTrack": return /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/i;
        default: return /(?:scsearch:|ytsearch:).*/i;
    }
}
exports.regexes = regexes;
function shuffleArray(array) {
    let len = array.length;
    while (array.length) {
        const i = Math.floor(Math.random() * len--);
        [array[len], array[i]] = [array[i], array[len]];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
//# sourceMappingURL=utils.js.map