import { Client, CommandInteraction } from "discord.js";
import modules from "@/state/modules";

export default async (interaction: CommandInteraction) => {
  const { commandName } = interaction;

  const command = modules.commands[commandName];
  if (command) {
    await command.execute(interaction);
  }
};
