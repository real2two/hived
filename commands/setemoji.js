const fetch = require("node-fetch");

module.exports = async (client, prefix, msg, args) => {
    const house = msg.house_id ? await client.cache.houses[msg.house_id] : null;
    if (!house) return msg.reply(":x: This is a DM/DM group, not a house.").catch(console.error);
    if (house.owner_id !== msg.author.id) return;
    let new_emoji = msg.content.slice(prefix.length).trim().slice("setemoji".length).trim();

    if (new_emoji.length == 0) {
        return msg.reply(`:arrow_forward: In order to use this command, use \`${prefix}setemoji <emoji name without the colons>\`.`);
    } else {

        let res = await 
            (
                await fetch(
                    `https://api.hiven.io/v1/rooms/${msg.room_id}`,

                    {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: client.token
                        },
                        body: JSON.stringify({ emoji: new_emoji })
                    }
                )
            ).json();

        if (!res.success) return msg.reply(`:x: An error has occured. Does the bot have manage room permissions?`);

        return msg.reply(`:white_check_mark: Successfully added a emoji icon on this room.\n\nIf it didn't change, make sure you removed the colons.\nYou might need to click on another room for full effect.`);
    }
}