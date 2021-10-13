const default_prefix = "h!";

const db = require('better-sqlite3')("database.sqlite");

db.prepare(`CREATE TABLE IF NOT EXISTS prefix (house VARCHAR(255) PRIMARY KEY, prefix VARCHAR(50))`).run();

module.exports = {
    async get(house) {
        let row = await db.prepare('SELECT * FROM prefix WHERE house=?').get(house);

        return row ? row.prefix : default_prefix;
    },

    async set(house, prefix) {
        await this.delete(house); // Why not modify? Because I'm lazy. - Two

        if (prefix == default_prefix) return true;

        db.prepare('INSERT INTO prefix (house, prefix) VALUES (?, ?)').run(house, prefix);

        return true;
    },

    async delete(house) {
        db.prepare('DELETE FROM prefix WHERE house=?').run(house);

        return true;
    }
};