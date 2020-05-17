"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = exports.dump = exports.isLink = exports.shuffleArray = exports.getTimeString = void 0;
const url_1 = require("url");
const node_fetch_1 = __importDefault(require("node-fetch"));
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
function dump(data, extension = "json") {
    return http("https://paste.pengubot.com/documents", { method: "post", body: data })
        .then(body => `https://paste.pengubot.com/${body.key}.${extension}`);
}
exports.dump = dump;
async function http(url, options, type = "json") {
    if (typeof options === "undefined") {
        options = {};
        type = "json";
    }
    else if (typeof options === "string") {
        type = options;
        options = {};
    }
    else if (typeof type === "undefined") {
        type = "json";
    }
    const query = new url_1.URLSearchParams(options.query || {});
    url = `${url}?${query}`;
    const result = await node_fetch_1.default(url, options);
    if (!result.ok)
        throw new Error(`${url} - ${result.status}`);
    switch (type) {
        case "result": return result;
        case "buffer": return result.buffer();
        case "json": return result.json();
        case "text": return result.text();
        default: throw new Error(`Unknown type ${type}`);
    }
}
exports.http = http;
//# sourceMappingURL=utils.js.map