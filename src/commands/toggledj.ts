import { KlasaMessage } from "@pengubot/klasa";
import { MusicCommand, MusicCommandOptions } from "../lib/structures/MusicCommand";
import { ApplyOptions } from "../lib/utils/Decorators";

@ApplyOptions<MusicCommandOptions>({
    description: "Enable or Disable DJ Only Mode.",
    aliases: ["enabledjonly", "disablejonly", "djonly"],
    permissionLevel: 5
})
export default class extends MusicCommand {

    public async run(message: KlasaMessage): Promise<KlasaMessage> {
        const toggle = !message.guild!.settings.get("toggles.djmode");
        await message.guild!.settings.update("toggles.djmode", toggle);
        return message.send(`> **Pengu DJ only mode has been ${toggle ? "Enabled" : "Disabled"}**`);
    }

}
