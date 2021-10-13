module.exports = async (client, prefix, msg, args) => {
    msg.reply(
        "I'm **Hiven**, a public Hiven bot.\n\n" +
        `:robot_face: I have **${Object.entries(client.cache.houses).length}** houses in cache.\n` +
        `:busts_in_silhouette: And, I see **${Object.entries(client.cache.users).length}** users in cache.\n\n` +
        `:arrow_forward: **Support house**: https://hiven.house/TzZLqn\n` +
        `:arrow_forward: **GitHub**: https://github.com/real2two/hived`
    );
}