module.exports = async (client, prefix, msg, args) => {
    msg.reply(
        `Hey **${msg.author.name}**!\n\n` +
        `:label: Your tag is \`@${msg.author.username}\`.\n` +
        `:id: Your user ID is \`${msg.author.id}\`.\n` +
        `:gift: Your account has been created at \`${SnowflakeToDate(msg.author.id)}\`.`
    );

    function SnowflakeToDate(snowflake) {
      const time = parseInt(snowflake, 10) / 4194304 + 1562544e6;
      const timestamp = !Number.isNaN(time) ? time : '';

      return new Date(timestamp);
    }
}