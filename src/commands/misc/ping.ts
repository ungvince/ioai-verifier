import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping the bot");

export const execute = (interaction: CommandInteraction) => {
  interaction.reply("Pong!");
};
