export const WILDCARD = /(?:scsearch:|ytsearch:).*/i;
export const EXPORTED = /https:\/\/paste.pengubot.com\/(.*)/i;
export const SPOTIFY_PLAYLIST = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|user\/spotify\/playlist\/|\?uri=spotify:playlist:)([1-z]{22})/i;
export const SPOTIFY_ALBUM = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/i;
export const SPOTIFY_TRACK = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/i;
