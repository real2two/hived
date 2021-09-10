require("dotenv").config();

const fs = require("fs");

const prefix_db = require("./prefix_db.js");

const { Client } = require('hiven');
const client = new Client({ type: 'user' });

client.on('init', () => {
  console.log("[BOT] Bot is ready!")
});

client.on('message', async (msg) => {
  if (!msg.house && !msg.author) return process.exit();

  const prefix = await prefix_db.get(msg.house.id);

  // msg.content
  // msg.author
  // msg.member
  // msg.house
  // msg.room
  // msg.edit()
  // msg.destroy()

  if (!msg.content.startsWith(prefix)) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!(command.match(/^[0-9a-zA-Z]+$/))) return;

  const file = `./commands/${command}.js`;

  if (fs.existsSync(file)) {
    if (!msg.author) return msg.room.send(`:x: We could not find your account information, due to hiven.js bugs. DM me once to resolve this issue.`);

    console.log(`${msg.author.name} | @${msg.author.username} (${msg.author.id}) ran: ${msg.content}`)

    try {
      (require(file))(client, prefix, msg, args);
    } catch(err) {
      console.log(err);
    }
  }
});

client.connect(process.env.TOKEN);