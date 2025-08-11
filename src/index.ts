import config from "@/config.json";
import fs from "fs";
import path from "path";
import getFolderContent from "@/utils/getFolderContent";
import modules from "@/state/modules";
import client from "@/state/client";

const { token } = config;

const registerFiles = getFolderContent(path.join(__dirname, "registers"));

for (const registerFile of registerFiles) {
  if (!registerFile.isDirectory) {
    const registerPath = path.join(__dirname, "registers", registerFile.name);
    const register = require(registerPath).default;
    register(client);
    console.log(`Registered: ${registerFile.name}`);
  }
}

client.login(token);
