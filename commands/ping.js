module.exports = async (client, prefix, msg, args) => {
    const message = await msg.reply(`⌛ **Getting bot ping...**`);

    const ping = Date.now() - message.timestamp;
    if (ping < 0) return message.edit(`:interrobang: **This commands is probably not made properly. THE PING IS LESS THAN 0?!?!?!** (\`${ping}ms\`)`);
    message.edit(`🏓 **Pong!** (\`${ping}ms\`)`);
}