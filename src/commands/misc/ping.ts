import {
  CommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
} from "discord.js";

import registerFiles from "@/utils/registerFiles";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Check if the bot is alive");

export const execute = (interaction: CommandInteraction) => {
  registerFiles();

  interaction.reply({
    content: "Pong!",
  });
};
