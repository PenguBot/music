import { URL, URLSearchParams } from "url";
import fetch from "node-fetch";

export function getTimeString(ms: number): string {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
    return `${hrs.padStart(2, "0")}:${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}

export function shuffleArray(array: any[]): any[] {
    let len = array.length;
    while (array.length) {
        const i = Math.floor(Math.random() * len--);
        [array[len], array[i]] = [array[i], array[len]];
    }
    return array;
}

export function isLink(arg: string): boolean | string {
    try {
        // eslint-disable-next-line no-new
        new URL(arg);
        return true;
    } catch (e) {
        return false;
    }
}

export function dump(data: string, extension = "json"): Promise<string> {
    return http("https://paste.pengubot.com/documents", { method: "post", body: data })
        .then(body => `https://paste.pengubot.com/${body.key}.${extension}`);
}

export async function http(url: string, options: Record<string, any>, type = "json"): Promise<any> {
    if (typeof options === "undefined") {
        options = {};
        type = "json";
    } else if (typeof options === "string") {
        type = options;
        options = {};
    } else if (typeof type === "undefined") {
        type = "json";
    }

    const query = new URLSearchParams(options.query || {});

    url = `${url}?${query}`;

    const result = await fetch(url, options);
    if (!result.ok) throw new Error(`${url} - ${result.status}`);

    switch (type) {
        case "result": return result;
        case "buffer": return result.buffer();
        case "json": return result.json();
        case "text": return result.text();
        default: throw new Error(`Unknown type ${type}`);
    }
}
