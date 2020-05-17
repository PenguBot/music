import { URL } from "url";

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
