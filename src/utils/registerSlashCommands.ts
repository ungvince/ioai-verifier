import client from "@/state/client";
import modules from "@/state/modules";

import { REST, Routes } from "discord.js";
import { token } from "@/config.json";

const rest = new REST().setToken(token);

export default async () => {
  const commands = [];

  for (const command of Object.values(modules.commands)) {
    commands.push(command.data.toJSON());
  }

  const data = await rest.put(Routes.applicationCommands(client.user!.id), {
    body: commands,
  });
};
