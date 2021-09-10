module.exports = async (client, prefix, msg, args) => {
    msg.room.send(
        `Hey **${msg.author.name}**!\n\n` +
        `:label: Your tag is \`@${msg.author.username}\`.\n` +
        `:id: Your user ID is \`${msg.author.id}\`.\n` +
        `:gift: Your account has been created at \`${msg.author.created.toString()}\`.`
    );
}