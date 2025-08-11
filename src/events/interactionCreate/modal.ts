import modules from "@/state/modules";
import {
  ChannelType,
  Interaction,
  Message,
  TextChannel,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
} from "discord.js";
import client from "@/state/client";
import noCacheRequire from "@/utils/noCacheRequire";
const { threadChannelID } = noCacheRequire("@/settings.json");

export default async (interaction: Interaction) => {
  if (interaction.isModalSubmit()) {
    const channel = (await client.channels.fetch(
      threadChannelID
    )) as TextChannel;

    const thread = await channel.threads.create({
      name: "Verification",
      autoArchiveDuration: 60,
      invitable: false,
      type: ChannelType.PrivateThread,
      reason: "User requested a verification thread",
    });

    interaction.reply({
      content: `Created thread: ${thread.url}`,
      flags: MessageFlags.Ephemeral,
    });

    const fullName = interaction.fields.getTextInputValue("fullNameInput");
    const country = interaction.fields.getTextInputValue("countryInput");
    const years = interaction.fields.getTextInputValue("yearsInput");
    const roles = interaction.fields.getTextInputValue("rolesInput");

    const doneButton = new ButtonBuilder()
      .setCustomId("done")
      .setLabel("I'm done")
      .setStyle(ButtonStyle.Success);

    await thread.send(
      `Admin data, ignore this message:\nFull Name: ${fullName}\nCountry: ${country}\nYears: ${years}\nRoles: ${roles}`
    );

    await thread.send({
      content: `# Hi ${interaction.user},\nPlease send any proof we accept below this message, then press the button`,
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(doneButton),
      ],
    });

    await thread.members.add(interaction.user.id);

    const nickname = `${fullName} [${country}]`;
    try {
      await interaction.guild?.members.edit(interaction.user.id, {
        nick: nickname,
      });
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  }
  return true;
};
