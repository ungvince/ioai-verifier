import {
  CommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from "discord.js";

import { VinceID } from "@/config.json";

import registerFiles from "@/utils/registerFiles";

export const data = new SlashCommandBuilder()
  .setName("refresh_modules")
  .setDescription("Refresh the bot's modules");

export const execute = (interaction: CommandInteraction) => {
  if (interaction.user.id !== VinceID) {
    interaction.reply({
      content: "Sorry you are not Vince",
      flags: MessageFlags.Ephemeral,
    });

    return;
  }

  registerFiles();

  interaction.reply({
    content: "Modules refreshed!",
    flags: MessageFlags.Ephemeral,
  });
};
