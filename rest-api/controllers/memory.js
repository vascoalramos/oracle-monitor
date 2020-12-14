const db = require("../resources/database");

module.exports.list_history = () => {
    return db.execute(`SELECT
                            TOTAL as "total",
                            USED as "used",
                            TSTP as "tstp"
                       FROM memory_values
                       ORDER BY TSTP`);
};

module.exports.group_history = (time) => {
    console.log(`SELECT
                            TOTAL as "total",
                            USED as "used",
                            TSTP as "tstp"
                       FROM view_memory_values_per_${time}
                       ORDER BY TSTP`);
    return db.execute(`SELECT
                            TOTAL as "total",
                            USED as "used",
                            TSTP as "tstp"
                       FROM view_memory_values_per_${time}
                       ORDER BY TSTP`);
};
