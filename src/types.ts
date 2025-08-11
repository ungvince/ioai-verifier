import type {
  ButtonInteraction,
  CommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

type ModulesType = {
  handlers: Record<string, Function>;
  events: Record<string, Function[]>;
  commands: Record<string, CommandType>;
  buttons: Record<string, ButtonType>;
};

type CommandType = {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
};

type ButtonType = {
  id: string;
  execute: (interaction: ButtonInteraction) => Promise<void>;
};
export type { ModulesType, CommandType };
