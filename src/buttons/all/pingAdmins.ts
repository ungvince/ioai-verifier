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
const { threadChannelID, adminRoleID } = noCacheRequire("@/settings.json");
import client from "@/state/client";
import noCacheRequire from "@/utils/noCacheRequire";

export const id = "done";

export const execute = async (interaction: ButtonInteraction) => {
  if (interaction.channel?.type === ChannelType.PrivateThread) {
    const messages = await interaction.channel.messages.fetch({ limit: 50 }); // Fetch last 50 messages
    const botMessages = messages.filter(
      (msg) => msg.author.id === client.user?.id
    );

    if (botMessages.size > 0) {
      const lastBotMessage = botMessages.first();
      await lastBotMessage?.edit({ components: [] });
    }

    const acceptButton = new ButtonBuilder()
      .setCustomId("accept")
      .setLabel("Verify User")
      .setStyle(ButtonStyle.Success);

    await interaction.channel?.send({
      content: `<@&${adminRoleID}>`,
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(acceptButton),
      ],
    });
  }
};
