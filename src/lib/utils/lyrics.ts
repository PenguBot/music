import cheerio from "cheerio";
import { http } from "./utils";

export default class Lyrics {

    public static async request(path: string, key: string): Promise<any> {
        return http(`https://api.genius.com/${path}`, { headers: { Authorization: `Bearer ${key}` } })
            .catch(error => {
                if (error.body.error) throw new Error(`${error.body.error}: ${error.body.error_description}`);
                throw error;
            });
    }

    public static async scrape(url: string): Promise<string|null> {
        const data = await http(url, {}, "text");
        const $ = cheerio.load(data);
        const lyrics = $(".lyrics");
        return lyrics ? lyrics.text().trim() : null;
    }

}
