import { Client } from "discord.js";
import getFolderContent from "@/utils/getFolderContent";
import path from "path";
import modules from "@/state/modules";
import client from "@/state/client";
import commandHandler from "@/handlers/commandHandler";
import noCacheRequire from "@/utils/noCacheRequire";

export default () => {
  const commandDirs = getFolderContent(path.join(__dirname, "../commands"));

  modules.handlers["command"] = commandHandler;

  for (const commandDir of commandDirs) {
    if (!commandDir.isDirectory) continue;

    const commandFiles = getFolderContent(
      path.join(__dirname, "../commands", commandDir.name)
    );

    for (const commandFile of commandFiles) {
      if (commandFile.isDirectory) continue;

      const commandPath = path.join(
        __dirname,
        "../commands",
        commandDir.name,
        commandFile.name
      );
      const command = noCacheRequire(commandPath);
      modules.commands[command.data.name] = command;
    }
    console.log(`Registered command: ${commandDir.name}`);
  }
};
