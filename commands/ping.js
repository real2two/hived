module.exports = async (client, prefix, msg, args) => {
    msg.room.send(`⌛ **Getting bot ping...**`).then(async (message) => {
        const ping = Date.now() - message.timestamp;
        if (ping < 0) return await message.edit(`:interrobang: **This commands is probably not made properly. THE PING IS LESS THAN 0?!?!?!** (\`${ping}ms\`)`);
        await message.edit(`🏓 **Pong!** (\`${ping}ms\`)`);
    }).catch(console.error);
}