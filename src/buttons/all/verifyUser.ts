import {
  MessageFlags,
  ButtonInteraction,
  TextChannel,
  ChannelType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalSubmitInteraction,
  ButtonStyle,
  ButtonBuilder,
} from "discord.js";

import registerFiles from "@/utils/registerFiles";
const { threadChannelID, adminRoleID, unverifiedRoleID } =
  noCacheRequire("@/settings.json");

import client from "@/state/client";
import noCacheRequire from "@/utils/noCacheRequire";

export const id = "accept";

export const execute = async (interaction: ButtonInteraction) => {
  const adminMember = await interaction.guild?.members.fetch(
    interaction.user.id
  );
  if (!adminMember?.roles.cache.has(adminRoleID)) {
    interaction.reply({
      content: "You do not have permission to verify users.",
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const channel = interaction.channel as TextChannel;
  const messages = await channel.messages.fetch({ limit: 50 });
  const botMessages = messages.filter(
    (msg) => msg.author.id === client.user?.id
  );

  console.log("testing bot messages:", botMessages.size);

  if (botMessages.size >= 2) {
    const secondToLastBotMessage = botMessages.at(1);
    const mentionedUsers = secondToLastBotMessage?.mentions.users;
    if (mentionedUsers?.size) {
      // Get the first mentioned user
      const user = mentionedUsers?.first();
      const member = await channel.guild.members.fetch(user!.id);
      await member.roles.remove(unverifiedRoleID);
      await interaction.channel?.delete();
    }
  }
};
