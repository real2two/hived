const fetch = require("node-fetch");

module.exports = async (client, prefix, msg, args) => {
    if (msg.house.owner.id !== msg.author.id) return;

    let new_emoji = msg.content.slice(prefix.length).trim().slice("setemoji".length).trim();

    if (new_emoji.length == 0) {
        return msg.room.send(`:arrow_forward: In order to use this command, use \`${prefix}setemoji <emoji name without the colons>\`.`).catch(console.error);
    } else {

        let res = await 
            (
                await fetch(
                    `https://api.hiven.io/v1/rooms/${msg.room.id}`,

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

        if (res.success == false) return msg.room.send(`:x: An error has occured. Does the bot have manage room permissions?`).catch(console.error);

        return msg.room.send(`:white_check_mark: Successfully added a emoji icon on this room.\n\nIf it didn't change, make sure you removed the colons.\nYou might need to click on another room and back to this room for full effect.`).catch(console.error);
    }
}