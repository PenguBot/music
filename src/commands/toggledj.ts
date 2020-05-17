import { KlasaMessage } from "klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Enable or Disable DJ Only Mode.",
    aliases: ["enabledjonly", "disablejonly", "djonly"],
    permissionLevel: 5
})

export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<any> {
        const toggle = !message.guild!.settings.get("toggles.djmode");
        await message.guild!.settings.update("toggles.djmode", toggle);
        return message.channel.send(`> **Pengu DJ only mode has been ${toggle ? "Enabled" : "Disabled"}**`);
    }

}
