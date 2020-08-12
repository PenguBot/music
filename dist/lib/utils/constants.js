"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPOTIFY_TRACK = exports.SPOTIFY_ALBUM = exports.SPOTIFY_PLAYLIST = exports.DUMP = exports.WILDCARD = void 0;
exports.WILDCARD = /(?:scsearch:|ytsearch:).*/i;
exports.DUMP = /https:\/\/paste.pengubot.com\/(.*)/i;
exports.SPOTIFY_PLAYLIST = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|user\/spotify\/playlist\/|\?uri=spotify:playlist:)([0-9a-z]{22})/i;
exports.SPOTIFY_ALBUM = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/i;
exports.SPOTIFY_TRACK = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/i;
//# sourceMappingURL=constants.js.map