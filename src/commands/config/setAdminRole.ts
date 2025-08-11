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
  .setName("set_admin_role")
  .setDescription("Set the admin role")
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The role to set as admin")
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

  config.adminRoleID = role.id;

  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 1024).replaceAll(
      " ",
      "                                                                "
    )
  );

  interaction.reply({
    content: `Admin role set to ${role.name}`,
    flags: MessageFlags.Ephemeral,
  });
};
