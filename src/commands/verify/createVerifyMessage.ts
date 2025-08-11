import {
  CommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

import registerFiles from "@/utils/registerFiles";

export const data = new SlashCommandBuilder()
  .setName("create_verify_message")
  .setDescription("Send the embed for verification");

export const execute = async (interaction: CommandInteraction) => {
  registerFiles();

  if (interaction.channel?.type !== ChannelType.GuildText) {
    interaction.reply({
      content: "This command can only be used in text channels.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const confirm = new ButtonBuilder()
    .setCustomId("verify")
    .setLabel("Create verification thread")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(confirm);

  await interaction.channel.send({
    content:
      "This is the very cool verify message that makes people want to kts",
    components: [row],
  });

  interaction.reply({
    content: "Sent",
    flags: MessageFlags.Ephemeral,
  });
};
