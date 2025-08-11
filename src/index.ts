import config from "@/config.json";
import fs from "fs";
import path from "path";
import getFolderContent from "@/utils/getFolderContent";
import modules from "@/state/modules";
import client from "@/state/client";
import registerFiles from "@/utils/registerFiles";

const { token } = config;

registerFiles();

client.login(token);
