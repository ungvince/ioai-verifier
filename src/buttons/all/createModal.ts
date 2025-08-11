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
} from "discord.js";

import registerFiles from "@/utils/registerFiles";
const { threadChannelID } = noCacheRequire("@/settings.json");
import client from "@/state/client";
import noCacheRequire from "@/utils/noCacheRequire";

export const id = "verify";

export const execute = async (interaction: ButtonInteraction) => {
  const fullNameInput = new TextInputBuilder()
    .setCustomId("fullNameInput")
    // The label is the prompt the user sees for this input
    .setLabel("What's your full name?")
    // Short means only a single line of text
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("John Doe");

  const countryInput = new TextInputBuilder()
    .setCustomId("countryInput")
    .setLabel("What's your countries 2 letter code?")
    .setPlaceholder("e.g. PL for Poland")
    .setMinLength(2)
    .setMaxLength(2)
    .setStyle(TextInputStyle.Short);

  const yearsInput = new TextInputBuilder()
    .setCustomId("yearsInput")
    .setLabel("Years of participation")
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("2024, 2025");

  const rolesInput = new TextInputBuilder()
    .setCustomId("rolesInput")
    .setLabel("What roles did you have")
    .setPlaceholder("Contestant, TL, Guide etc.")
    .setStyle(TextInputStyle.Short);

  const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
    fullNameInput
  );
  const secondActionRow =
    new ActionRowBuilder<TextInputBuilder>().addComponents(countryInput);
  const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
    yearsInput
  );
  const fourthActionRow =
    new ActionRowBuilder<TextInputBuilder>().addComponents(rolesInput);

  const modal = new ModalBuilder()
    .setCustomId(`verify-modal-${crypto.randomUUID()}`)
    .setTitle("Verification")
    .setComponents([
      firstActionRow,
      secondActionRow,
      thirdActionRow,
      fourthActionRow,
    ]);

  await interaction.showModal(modal);
};
