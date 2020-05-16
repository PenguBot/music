"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLink = exports.shuffleArray = exports.getTimeString = void 0;
const url_1 = require("url");
function getTimeString(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
    return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
exports.getTimeString = getTimeString;
function shuffleArray(array) {
    let len = array.length;
    while (array.length) {
        const i = Math.floor(Math.random() * len--);
        [array[len], array[i]] = [array[i], array[len]];
    }
    return array;
}
exports.shuffleArray = shuffleArray;
function isLink(arg) {
    try {
        new url_1.URL(arg);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isLink = isLink;
//# sourceMappingURL=utils.js.map