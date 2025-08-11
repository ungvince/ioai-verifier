import { Client } from "discord.js";
import modules from "@/state/modules";

export default async (eventName: string, args: any[]) => {
  for (const event of modules.events[eventName]) {
    let result = await event(...args);
    if (typeof result !== "boolean") {
      break;
    }

    if (result === false) {
      break;
    }
  }
};
