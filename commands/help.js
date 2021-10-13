module.exports = async (client, prefix, msg, args) => {
    const house = msg.house_id ? await client.cache.houses[msg.house_id] : null;

    msg.reply(
        ":wave: Hey! I'm Hived, a public Hiven bot.\n\n" +
        `\`${prefix}help\` **-** The help command.\n` +
        `\`${prefix}invite\` **-** Invite the bot to your own server.\n` +
        `\`${prefix}botinfo\` **-** Check this bot's information.\n` +
        `\`${prefix}ping\` **-** Ping!\n` +
        (house ? `\`${prefix}houseinfo\` **-** Check this house's (server) information.\n` : "") +
        `\`${prefix}userinfo\` **-** Check your account's information.\n` +
        `\`${prefix}dice\` **-** Roll a dice.\n` +
        `\`${prefix}joke\` **-** Send a terrible joke. ( <https://github.com/15Dkatz/official_joke_api> )\n` +
        (house ? (house.owner_id == msg.author.id ? `\`${prefix}setemoji\` **-** Set the emoji of the current room. (HOUSE OWNER ONLY)\n` : "") : "") +
        (house ? (house.owner_id == msg.author.id ? `\`${prefix}setprefix\` **-** Set the prefix of bot in this server. (HOUSE OWNER ONLY)\n` : "") : "") // +
    );
}