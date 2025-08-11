import modules from "@/state/modules";
import { Interaction, Message } from "discord.js";

export default (interaction: Interaction) => {
  if (interaction.isButton()) {
    modules.handlers["button"](interaction);
  }
  return true;
};
