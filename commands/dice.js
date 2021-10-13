module.exports = async (client, prefix, msg, args) => {
    msg.reply(
        `:game_die: You have rolled a **${Math.floor(Math.random() * 6) + 1}**.`
    );
}