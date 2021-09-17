const prefix_db = require("../prefix_db.js");

module.exports = async (client, prefix, msg, args) => {
    if (msg.house.owner.id !== msg.author.id) return;

    let new_prefix = msg.content.slice(prefix.length).trim().slice("setprefix".length).trim();
    if (new_prefix.length == 0) return msg.room.send(`:arrow_forward: You can set the bot's prefix using \`${prefix}setprefix <prefix>\`.`).catch(console.error);
    if (new_prefix.length > 50) return msg.room.send(`:x: The prefix cannot be over 50 characters.`).catch(console.error);

    await prefix_db.set(msg.house.id, new_prefix);

    return msg.room.send(`:white_check_mark: Successfully set the prefix to \`${new_prefix}\`!`).catch(console.error);
}