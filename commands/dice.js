module.exports = async (client, prefix, msg, args) => {
    msg.room.send(
        `:game_die: You have rolled a **${Math.floor(Math.random() * 6) + 1}**.`
    ).catch(console.error);
}