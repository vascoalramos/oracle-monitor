const db = require("../resources/database");

module.exports.list = () => {
    return db.execute('SELECT NAME as "name", CON_ID as "con_id" FROM mat_view_pdb');
};

module.exports.list_history = () => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                NAME as "name",
                                CON_ID as "con_id",
                                TOTAL_SIZE as "size",
                                TSTP as "tstp"
                             FROM pdb_values
                             ORDER BY TSTP DESC
                            )
                       WHERE rownum <= (select count(distinct name) from pdb_values) * 30
                       ORDER BY rownum DESC`);
};

module.exports.group_history = (time) => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                NAME as "name",
                                CON_ID as "con_id",
                                TOTAL_SIZE as "size",
                                TSTP as "tstp"
                             FROM view_pdb_values_per_${time}
                             ORDER BY TSTP DESC
                            )
                       WHERE rownum <= (select count(distinct name) from view_pdb_values_per_${time}) * 30
                       ORDER BY rownum DESC`);
};
