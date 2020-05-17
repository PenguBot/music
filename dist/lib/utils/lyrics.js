"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const utils_1 = require("./utils");
class Lyrics {
    static async request(path, key) {
        return utils_1.http(`https://api.genius.com/${path}`, { headers: { Authorization: `Bearer ${key}` } })
            .catch(error => {
            if (error.body.error)
                throw new Error(`${error.body.error}: ${error.body.error_description}`);
            throw error;
        });
    }
    static async scrape(url) {
        const data = await utils_1.http(url, {}, "text");
        const $ = cheerio_1.default.load(data);
        const lyrics = $(".lyrics");
        return lyrics ? lyrics.text().trim() : null;
    }
}
exports.default = Lyrics;
//# sourceMappingURL=lyrics.js.map