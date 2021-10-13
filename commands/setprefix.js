const prefix_db = require("../prefix_db.js");

module.exports = async (client, prefix, msg, args) => {
    const house = msg.house_id ? await client.cache.houses[msg.house_id] : null;
    if (!house) return msg.reply(":x: This is a DM/DM group, not a house.").catch(console.error);
    if (house.owner_id !== msg.author.id) return;

    let new_prefix = msg.content.slice(prefix.length).trim().slice("setprefix".length).trim();
    if (new_prefix.length == 0) return msg.reply(`:arrow_forward: You can set the bot's prefix using \`${prefix}setprefix <prefix>\`.`);
    if (new_prefix.length > 50) return msg.reply(`:x: The prefix cannot be over 50 characters.`);

    await prefix_db.set(msg.house_id, new_prefix);

    return msg.reply(`:white_check_mark: Successfully set the prefix to \`${new_prefix}\`!`);
}