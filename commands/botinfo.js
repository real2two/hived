module.exports = async (client, prefix, msg, args) => {
    msg.room.send(
        "I'm **Hiven**, a public Hiven bot.\n\n" +
        `:robot_face: I am in **${client.houses.size}** houses.\n` +
        `:busts_in_silhouette: And, I'm serving **${ client.users.get(undefined) ? client.users.size - 1 : client.users.size }** users.\n\n` +
        `:arrow_forward: **Support house**: https://hiven.house/TzZLqn\n` +
        `:arrow_forward: **GitHub**: https://github.com/real2two/hived`
    );
}
