let fake = new Set();
let cooldown = new Set();

module.exports = async (client, prefix, msg, args) => {
    if (cooldown.has(msg.author.id)) return msg.room.send(`:x:  There is a minute user cooldown for this command. Please try again later!`);

    if (!args.length) return msg.room.send(`:arrow_forward: You can invite this bot into another guild by using \`${prefix}invite <invite code>\`. Please don't abuse this command!`);
    if (args[1]) return msg.room.send(`:x: There should not be a second argument.`);

    if (cooldown.has("global")) return msg.room.send(`:x: There is a 5 second global cooldown for this command. Please try again in few seconds!`);

    cooldown.add("global");
    cooldown.add(msg.author.id);

    setTimeout(() => {
        cooldown.delete("global");
    }, 5000);

    setTimeout(() => {
        cooldown.delete(msg.author.id);
    }, 60000);

    let roomID = args[0];

    // I'm sorry for the else if horror. - Two

    if (roomID.startsWith("http://hiven.house/")) {
        roomID = roomID.slice("http://hiven.house/".length);
    } else if (roomID.startsWith("https://hiven.house/")) {
        roomID = roomID.slice("https://hiven.house/".length);
    } else if (roomID.startsWith("hiven.house/")) {
        roomID = roomID.slice("hiven.house/".length);
    }

    if (roomID.length !== 6) return msg.room.send(`:x: Room IDs should be 6 characters long.`);
    if (fake.has(roomID)) return msg.room.send(`:x: There has already been an attempt to invite the bot with the provided invite code recently. You must wait an hour before attempting to use this invite code again.`);
    if (!(roomID.match(/^[0-9a-zA-Z]+$/))) return msg.room.send(`:x: A room with the provided invite code can only contain English letters and numbers.`);

    fake.add(roomID);
        
    setTimeout(() => {
        fake.delete(roomID);
    }, 3.6e+6);

    const testJoin = client.houses.Join(roomID);
    
    try {
        await testJoin;
    } catch(err) {
    } finally {
        testJoin
            .then(async (house) => {
                if (!house || !house.owner) {
                    console.log("[BUILT-IN ERROR] House joining error. House data below:")
                    console.log(house)
                    return msg.room.send(`An error has occured.`);
                }

                if (house.owner.id !== msg.author.id) {
                    await client.houses.leave(house.id);
                    return msg.room.send(`:x: You do not own this house.`);
                }
                return msg.room.send(`:white_check_mark: Successfully entered the house, **${house.name}**!`);
            })
            .catch((err2) => {
                return msg.room.send(`:x: Could not join server.`);
            });
    }




}
