module.exports = async (client, prefix, msg, args) => {
    msg.room.send(
        ":wave: Hey! I'm Hived, a public Hiven bot. (probably the first public one)\n\n" +
        `\`${prefix}help\` **-** The help command.\n` +
        `\`${prefix}invite\` **-** Invite the bot to your own server.\n` +
        `\`${prefix}botinfo\` **-** Check this bot's information.\n` +
        `\`${prefix}houseinfo\` **-** Check this house's (server) information.\n` +
        `\`${prefix}userinfo\` **-** Check your account's information.\n` +
        `\`${prefix}dice\` **-** Roll a dice.\n` +
        `\`${prefix}joke\` **-** Send a terrible joke. ( <https://github.com/15Dkatz/official_joke_api> )\n` +
        (msg.house.owner.id == msg.author.id ? `\`${prefix}setprefix\` **-** Set the prefix of bot in this server. (HOUSE OWNER ONLY)\n` : "") // +
    );
}