import { Client } from "discord.js";
import getFolderContent from "@/utils/getFolderContent";
import path from "path";
import modules from "@/state/modules";
import client from "@/state/client";
import eventHandler from "@/handlers/eventHandler";

export default () => {
  const eventDirs = getFolderContent(path.join(__dirname, "../events"));

  modules.handlers["event"] = eventHandler;

  for (const eventDir of eventDirs) {
    if (!eventDir.isDirectory) continue;

    modules.events[eventDir.name] = modules.events[eventDir.name] || [];

    const eventFiles = getFolderContent(
      path.join(__dirname, "../events", eventDir.name)
    );

    for (const eventFile of eventFiles) {
      if (eventFile.isDirectory) continue;

      const eventPath = path.join(
        __dirname,
        "../events",
        eventDir.name,
        eventFile.name
      );
      const event = require(eventPath).default;

      modules.events[eventDir.name].push(event);
    }
    console.log(`Registered event: ${eventDir.name}`);
  }

  for (const eventName of Object.keys(modules.events)) {
    client.on(eventName, (...args) => {
      modules.handlers["event"](eventName, args);
    });
  }
};
