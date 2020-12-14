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
