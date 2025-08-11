import type { CommandInteraction, SlashCommandBuilder } from "discord.js";

type ModulesType = {
  handlers: Record<string, Function>;
  events: Record<string, Function[]>;
  commands: Record<string, CommandType>;
};

type CommandType = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

export type { ModulesType, CommandType };
