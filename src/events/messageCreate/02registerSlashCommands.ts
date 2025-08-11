import { Message } from "discord.js";
import { VinceID } from "@/config.json";

import registerSlashCommands from "@/utils/registerSlashCommands";

export default async (message: Message) => {
  if (message.content === "!register") {
    if (message.author.id !== VinceID) {
      return true;
    }

    await message.delete();

    if (message.guild === null) return true;

    await registerSlashCommands(message.guild.id);

    await message.author.send("Registered slash commands");
  }
};
