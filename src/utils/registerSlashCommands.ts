import client from "@/state/client";
import modules from "@/state/modules";

import { REST, Routes } from "discord.js";
import { token } from "@/config.json";

const rest = new REST().setToken(token);

export default async (guild_id: string) => {
  const commands = [];
  for (const command of Object.values(modules.commands)) {
    commands.push(command.data.toJSON());
  }

  const data = await rest.put(
    Routes.applicationGuildCommands(client.user!.id, guild_id),
    {
      body: commands,
    }
  );
};
