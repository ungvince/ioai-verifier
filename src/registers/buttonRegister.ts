import { Client } from "discord.js";
import getFolderContent from "@/utils/getFolderContent";
import path from "path";
import modules from "@/state/modules";
import client from "@/state/client";
import buttonHandler from "@/handlers/buttonHandler";
import noCacheRequire from "@/utils/noCacheRequire";

export default () => {
  const buttonDirs = getFolderContent(path.join(__dirname, "../buttons"));

  modules.handlers["button"] = buttonHandler;

  for (const buttonDir of buttonDirs) {
    if (!buttonDir.isDirectory) continue;

    const buttonFiles = getFolderContent(
      path.join(__dirname, "../buttons", buttonDir.name)
    );

    for (const buttonFile of buttonFiles) {
      if (buttonFile.isDirectory) continue;

      const buttonPath = path.join(
        __dirname,
        "../buttons",
        buttonDir.name,
        buttonFile.name
      );
      const button = noCacheRequire(buttonPath);
      modules.buttons[button.id] = button;
    }
    console.log(`Registered button: ${buttonDir.name}`);
  }
};
