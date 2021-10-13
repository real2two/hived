require("dotenv").config();

const fs = require("fs");

const prefix_db = require("./prefix_db.js");

const xena = require("xena.js");
const client = new xena.Client(process.env.TOKEN);

client.on('ready', () => {
  console.log("[BOT] Bot is ready!")
});

client.on('messageCreate', async (msg) => {
  const prefix = await prefix_db.get(msg.house_id ? msg.house_id : "h!");

  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!(command.match(/^[0-9a-zA-Z]+$/))) return;

  const file = `./commands/${command}.js`;

  if (fs.existsSync(file)) {
    try {
      (require(file))(client, prefix, msg, args);
    } catch(err) {
      console.log(err);
    }
  }
});