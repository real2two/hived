module.exports = async (client, prefix, msg, args) => {
    if (!msg.house) return msg.room.send(":x: This is a DM/DM group, not a house.").catch(console.error);

    msg.room.send(
        `:house: **House Information**\n\n` +
        `The house's (server) name is **${msg.house.name}**. (\`${msg.house.id}\`).\n` +
        `This house was created on \`${msg.house.created.toString()}\`.\n` +
        `There are **${msg.house.rooms.size}** rooms (channels) in this house.\n` //+
        //`There are **${msg.house.members.size}** members in the message's room.`
    ).catch(console.error);
}