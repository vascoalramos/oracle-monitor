const db = require("../resources/database");

module.exports.list_history = () => {
    return db.execute(`SELECT
                            USERNAME as "username",
                            VALUE as "value",
                            TSTP as "tstp"
                       FROM cpu_values
                       ORDER BY TSTP`);
};

module.exports.group_history = (time) => {
    return db.execute(`SELECT
                            USERNAME as "username",
                            VALUE as "value",
                            TSTP as "tstp"
                       FROM view_cpu_values_per_${time}
                       ORDER BY TSTP`);
};
