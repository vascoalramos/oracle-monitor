const db = require("../resources/database");

module.exports.findAll = async () => {
    return await db.execute("SELECT * FROM patient");
};
