import { BitField } from "discord.js";
export declare class MusicBitField extends BitField<MusicBitFieldString> {
    static FLAGS: Record<MusicBitFieldString, number>;
}
export declare type MusicBitFieldString = "USER_VOICE_CHANNEL" | "BOT_VOICE_CHANNEL" | "HAS_PERMISSION" | "COMMON_VOICE_CHANNEL" | "QUEUE_NOT_EMPTY" | "VOICE_PLAYING" | "VOICE_PAUSED" | "DJ_MEMBER";
