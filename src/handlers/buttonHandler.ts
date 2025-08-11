import { ButtonInteraction } from "discord.js";
import modules from "@/state/modules";

export default async (interaction: ButtonInteraction) => {
  const { customId } = interaction;

  const button = modules.buttons[customId];
  if (button) {
    await button.execute(interaction);
  }
};
