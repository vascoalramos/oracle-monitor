const db = require("../resources/database");

module.exports.list_history = () => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                USERNAME as "username",
                                VALUE as "value",
                                TSTP as "tstp"
                             FROM cpu_values
                             ORDER BY TSTP DESC
                            )
                       WHERE rownum <= (select count(distinct username) from cpu_values) * 30
                       ORDER BY rownum DESC`);
};

module.exports.group_history = (time) => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                USERNAME as "username",
                                VALUE as "value",
                                TSTP as "tstp"
                             FROM view_cpu_values_per_${time}
                             ORDER BY TSTP DESC
                            )
                       WHERE rownum <= (select count(distinct username) from view_cpu_values_per_${time}) * 30
                       ORDER BY rownum DESC`);
};
