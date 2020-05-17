export default class Lyrics {
    static request(path: string, key: string): Promise<any>;
    static scrape(url: string): Promise<string | null>;
}
