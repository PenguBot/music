/// <reference types="node" />
import { URLSearchParams } from "url";
import { Response, RequestInit } from "node-fetch";
export declare function getTimeString(ms: number): string;
export declare function shuffleArray(array: any[]): any[];
export declare function isLink(arg: string): boolean | string;
export declare function haste(data: string, extension?: string): Promise<string>;
export interface FetchOptions extends RequestInit {
    query?: string | URLSearchParams | {
        [key: string]: string | string[];
    } | Iterable<[string, string]> | [string, string][];
}
export declare function fetch(url: string, type: "json"): Promise<any>;
export declare function fetch(url: string, options: FetchOptions, type: "json"): Promise<any>;
export declare function fetch(url: string, type: "buffer"): Promise<Buffer>;
export declare function fetch(url: string, options: FetchOptions, type: "buffer"): Promise<Buffer>;
export declare function fetch(url: string, type: "text"): Promise<string>;
export declare function fetch(url: string, options: FetchOptions, type: "text"): Promise<string>;
export declare function fetch(url: string, type: "result"): Promise<Response>;
export declare function fetch(url: string, options: FetchOptions, type: "result"): Promise<Response>;
export declare function fetch(url: string, options: FetchOptions, type?: "result" | "json" | "buffer" | "text"): Promise<Response | Buffer | string | any>;
