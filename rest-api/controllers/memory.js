const db = require("../resources/database");

module.exports.list_history = () => {
    return db.execute(`SELECT * 
                       FROM (
                             SELECT
                                TOTAL as "total",
                                USED as "used",
                                TSTP as "tstp"
                             FROM memory_values
                             ORDER BY TSTP DESC
                            )
                       WHERE rownum <= 30
                       ORDER BY rownum DESC`);
};

module.exports.group_history = (time) => {
    return db.execute(`SELECT * 
                       FROM (
                             SELECT
                                TOTAL as "total",
                                USED as "used",
                                TSTP as "tstp"
                             FROM view_memory_values_per_${time}
                             ORDER BY TSTP DESC
                            )
                       WHERE rownum <= 30
                       ORDER BY rownum DESC`);
};
