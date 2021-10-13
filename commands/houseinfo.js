module.exports = async (client, prefix, msg, args) => {
    const house = msg.house_id ? await client.cache.houses[msg.house_id] : null;

    if (!house) return msg.reply(":x: This is a DM/DM group, not a house.").catch(console.error);

    msg.reply(
        `:house: **House Information**\n\n` +
        `The house's (server) name is **${house.name}**. (\`${house.id}\`).\n` +
        `This house was created on \`${SnowflakeToDate(house.id)}\`.\n` +
        `There are **${client.cache.rooms.filter(i => i.house_id == house.id).length}** rooms (channels) in this house.\n` //+
        //`There are **${msg.house.members.size}** members in the message's room.`
    );

    function SnowflakeToDate(snowflake) {
        const time = parseInt(snowflake, 10) / 4194304 + 1562544e6;
        const timestamp = !Number.isNaN(time) ? time : '';
  
        return new Date(timestamp);
    }
}