const db = require("../resources/database");

module.exports.list_history = () => {
    return db.execute(`SELECT
                            VALUE as "value",
                            TSTP as "tstp"
                       FROM cpu_values
                       ORDER BY TSTP`);
};
