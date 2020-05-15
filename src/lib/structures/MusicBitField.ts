// Copyright (c) 2019-2020 Antonio Román. All rights reserved. Apache License 2.0.
// Source: https://github.com/skyra-project/skyra

import { BitField } from "discord.js";

export class MusicBitField extends BitField<MusicBitFieldString> {

    public static FLAGS: Record<MusicBitFieldString, number> = {
        USER_VOICE_CHANNEL: 1 << 0,
        BOT_VOICE_CHANNEL: 1 << 1,
        HAS_PERMISSION: 1 << 2,
        COMMON_VOICE_CHANNEL: 1 << 3,
        QUEUE_NOT_EMPTY: 1 << 4,
        VOICE_PLAYING: 1 << 5,
        VOICE_PAUSED: 1 << 6,
        DJ_MEMBER: 1 << 7
    };

}

export type MusicBitFieldString = "USER_VOICE_CHANNEL" | "BOT_VOICE_CHANNEL" | "HAS_PERMISSION" | "COMMON_VOICE_CHANNEL" | "QUEUE_NOT_EMPTY" | "VOICE_PLAYING" | "VOICE_PAUSED" | "DJ_MEMBER";
