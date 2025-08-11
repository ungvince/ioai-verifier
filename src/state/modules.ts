import type { ModulesType } from "@/types";
import client from "./client";

export const modules: ModulesType = {
  handlers: {},
  events: {},
  commands: {},
  buttons: {},
};

export default modules;

export const resetModules = () => {
  for (const key in modules) {
    // @ts-ignore
    modules[key] = {};
  }

  client.removeAllListeners();
};
