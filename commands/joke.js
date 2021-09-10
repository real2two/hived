const fetch = require("node-fetch");

let jokes = [];

module.exports = async (client, prefix, msg, args) => {
    if (!jokes.length) {
        jokes = await (
            await fetch("https://raw.githubusercontent.com/15Dkatz/official_joke_api/master/jokes/index.json")
        ).json();
    }

    const num = Math.floor(Math.random() * jokes.length);
    const joke = jokes[num];

    msg.room.send(
        `__:studio_microphone: **${joke.setup}**__\n` +
        `${joke.punchline}`
    );
}