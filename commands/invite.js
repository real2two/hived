const fetch = require("node-fetch");

let fake = new Set();
let cooldown = new Set();

module.exports = async (client, prefix, msg, args) => {
    if (cooldown.has(msg.author.id)) return msg.reply(`:x: There is a minute user cooldown for this command. Please try again later!`);

    if (!args.length) return msg.reply(`:arrow_forward: You can invite this bot into another guild by using \`${prefix}invite <invite code>\`. Please don't abuse this command!`);
    if (args[1]) return msg.reply(`:x: There should not be a second argument.`);

    let roomID = args[0];

    // I'm sorry for the else if horror. - Two

    if (roomID.startsWith("http://hiven.house/")) {
        roomID = roomID.slice("http://hiven.house/".length);
    } else if (roomID.startsWith("https://hiven.house/")) {
        roomID = roomID.slice("https://hiven.house/".length);
    } else if (roomID.startsWith("hiven.house/")) {
        roomID = roomID.slice("hiven.house/".length);
    }

    if (roomID.length !== 6) return msg.reply(`:x: Room IDs should be 6 characters long.`);
    if (fake.has(roomID)) return msg.reply(`:x: There has already been an attempt to invite the bot with the provided invite code recently. You must wait an hour before attempting to use this invite code again.`);
    if (!(roomID.match(/^[0-9a-zA-Z]+$/))) return msg.reply(`:x: A room with the provided invite code can only contain English letters and numbers.`);

    fake.add(roomID);
        
    setTimeout(() => {
        fake.delete(roomID);
    }, 3.6e+6);

    if (cooldown.has("global")) return msg.reply(`:x: There is a 5 second global cooldown for this command. Please try again in few seconds!`);

    cooldown.add("global");
    cooldown.add(msg.author.id);

    setTimeout(() => {
        cooldown.delete("global");
    }, 5000);

    setTimeout(() => {
        cooldown.delete(msg.author.id);
    }, 60000);

    const req = await fetch(`https://api.hiven.io/v1/invites/${roomID}`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            Authorization: client.token
        },
        body: "{}"
    });
    
    const res = await req.json();
    
    if (!res.success) return msg.reply(`:x: ${res.error.message}. (code: \`${res.error.code}\`)`);

    return msg.reply(`:white_check_mark: Successfully added the bot to the server.`);
}