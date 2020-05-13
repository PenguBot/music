"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeString = void 0;
function getTimeString(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
    return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
exports.getTimeString = getTimeString;
//# sourceMappingURL=utils.js.map