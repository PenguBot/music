import { Event, KlasaGuild, KlasaUser } from "klasa";

export default class extends Event {

    public async run(guild: KlasaGuild, skipper: KlasaUser): Promise<any> {
        const { music } = guild;
        const [song] = music.queue;
        if (music.looping) return music.textChannel!.send(`> Music is currently looping, unable to skip.`);
        if (song.skips.has(skipper)) return music.textChannel!.send(`> ${skipper} you have already voted to skip this song.`);

        song.skips.add(skipper);
        const members = music.voiceChannel!.members.size - 1;
        const countString = song.skips.size >= members * 0.4 ? false : `> 🔸 | Votes: ${song.skips.size} of ${Math.ceil(members * 0.4)}`;
        if (countString) {
            return music.textChannel!.send(countString);
        } else {
            await music.skip();
            return music.textChannel!.send(`> **${song.title}** was skipped by ${skipper}.`);
        }
    }

}
