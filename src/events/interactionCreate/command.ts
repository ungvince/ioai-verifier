import modules from "@/state/modules";
import { Interaction, Message } from "discord.js";

export default (interaction: Interaction) => {
  if (interaction.isCommand()) {
    modules.handlers["command"](interaction);
  }
  return true;
};
