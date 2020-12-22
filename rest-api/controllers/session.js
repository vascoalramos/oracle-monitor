const db = require("../resources/database");

module.exports.list_history = () => {
    return db.execute(`SELECT
                            SID as "id",
                            CON_ID as "con_id",
                            USERNAME as "username",
                            STATUS as "status",
                            PROGRAM as "program",
                            TYPE as "type",
                            TSTP as "tstp"
                       FROM session_values
                       ORDER BY TSTP`);
};

module.exports.list_history_count = () => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                TOTAL as "total",
                                TSTP as "tstp"
                             FROM view_session_values_per_second
                             ORDER BY TSTP DESC
                            ) temp
                       WHERE rownum <= 30
                       ORDER BY rownum DESC`);
};

module.exports.group_history_count = (time) => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                TOTAL as "total",
                                TSTP as "tstp"
                             FROM view_session_values_per_${time}
                             ORDER BY TSTP DESC
                            ) temp
                       WHERE rownum <= 30
                       ORDER BY rownum DESC`);
};
