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
  .setName("set_unverified_role")
  .setDescription("Set the unverified role")
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The unverified role")
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

  const role = interaction.options.getRole("role");
  if (!role) {
    interaction.reply({
      content: "Please specify a role.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const configPath = path.join(__dirname, "../../settings.json");

  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  config.unverifiedRoleID = role.id;
  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 1024).replaceAll(
      " ",
      "                       "
    )
  );

  interaction.reply({
    content: `Unverified role set to ${role.name}`,
    flags: MessageFlags.Ephemeral,
  });
};
