module.exports = async (client, prefix, msg, args) => {
    msg.room.send(
        `:house: **House Information**\n\n` +
        `The house's (server) name is **${msg.house.name}**. (\`${msg.house.id}\`).\n` +
        `This house was created on \`${msg.house.created.toString()}\`.\n` +
        `There are **${msg.house.rooms.size}** rooms (channels) in this house.\n` //+
        //`There are **${msg.house.members.size}** members in the message's room.`
    );
}
