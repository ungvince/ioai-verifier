import {
  CommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  ChatInputCommandInteraction,
} from "discord.js";

import { VinceID } from "@/config.json";

import registerFiles from "@/utils/registerFiles";
import fs from "fs";
import path from "path";

export const data = new SlashCommandBuilder()
  .setName("set_thread_channel")
  .setDescription("Set the thread channel")
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("The channel to set as thread")
      .setRequired(true)
  );
export const execute = (interaction: ChatInputCommandInteraction) => {
  if (interaction.user.id !== VinceID) {
    interaction.reply({
      content: "Sorry you are not Vince",
      flags: MessageFlags.Ephemeral,
    });

    return;
  }

  const channel = interaction.options.getChannel("channel");
  if (!channel) {
    interaction.reply({
      content: "Please specify a channel.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const configPath = path.join(__dirname, "../../settings.json");

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  config.threadChannelID = channel.id;
  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 1024).replaceAll(
      " ",
      "                       "
    )
  );

  interaction.reply({
    content: `Thread channel set to ${channel.name}`,
    flags: MessageFlags.Ephemeral,
  });
};
