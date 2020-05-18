import { URL, URLSearchParams } from "url";
import nodeFetch, { Response, RequestInit } from "node-fetch";

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

export function haste(data: string, extension = "json"): Promise<string> {
    return fetch("https://paste.pengubot.com/documents", { method: "POST", body: data })
        .then(body => `https://paste.pengubot.com/${body.key}.${extension}`);
}

export interface FetchOptions extends RequestInit {
    query?: string | URLSearchParams | { [key: string]: string | string[]; } | Iterable<[string, string]> | [string, string][];
}

export async function fetch(url: string, type: "json"): Promise<any>;
export async function fetch(url: string, options: FetchOptions, type: "json"): Promise<any>;
export async function fetch(url: string, type: "buffer"): Promise<Buffer>;
export async function fetch(url: string, options: FetchOptions, type: "buffer"): Promise<Buffer>;
export async function fetch(url: string, type: "text"): Promise<string>;
export async function fetch(url: string, options: FetchOptions, type: "text"): Promise<string>;
export async function fetch(url: string, type: "result"): Promise<Response>;
export async function fetch(url: string, options: FetchOptions, type: "result"): Promise<Response>;
export async function fetch(url: string, options: FetchOptions, type?: "result" | "json" | "buffer" | "text"): Promise<Response | Buffer | string | any>;
export async function fetch(url: string, options: FetchOptions | "result" | "json" | "buffer" | "text", type?: "result" | "json" | "buffer" | "text"): Promise<any> {
    if (typeof options === "undefined") {
        options = {};
        type = "json";
    } else if (typeof options === "string") {
        type = options;
        options = {};
    } else if (typeof type === "undefined") {
        type = "json";
    }

    if (options.query) url = `${url}?${new URLSearchParams(options.query || {})}`;

    const result: Response = await nodeFetch(url, options);
    if (!result.ok) throw new Error(`${result.status}: ${result.statusText}`);

    switch (type) {
        case "result": return result;
        case "buffer": return result.buffer();
        case "json": return result.json();
        case "text": return result.text();
        default: throw new Error(`Unknown type ${type}`);
    }
}
