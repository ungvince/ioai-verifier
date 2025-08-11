import { Message } from "discord.js";

export default (message: Message) => {
  if (message.content === "!ping") {
    if (message.channel.type === 0) {
      message.channel.send("Pong!");
    }
  }
  return true;
};
