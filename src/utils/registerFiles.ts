import config from "@/config.json";
import fs from "fs";
import path from "path";
import getFolderContent from "@/utils/getFolderContent";
import modules from "@/state/modules";
import { resetModules } from "@/state/modules";
import client from "@/state/client";
import noCacheRequire from "./noCacheRequire";

export default () => {
  resetModules();

  const basePath = path.join(__dirname, "../registers");

  const registerFiles = getFolderContent(basePath);

  for (const registerFile of registerFiles) {
    if (!registerFile.isDirectory) {
      const registerPath = path.join(basePath, registerFile.name);
      const register = noCacheRequire(registerPath).default;
      register();
      console.log(`Registered: ${registerFile.name}`);
    }
  }
};
