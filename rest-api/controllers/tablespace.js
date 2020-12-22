const db = require("../resources/database");

module.exports.list = () => {
    return db.execute('SELECT NAME as "name" FROM tablespace');
};

module.exports.list_history = () => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                NAME as "name",
                                TOTAL as "total",
                                FREE as "free",
                                USED as "used",
                                PERCENTAGE_FREE as "percentage_free",
                                PERCENTAGE_USED as "percentage_used",
                                TSTP as "tstp"
                            FROM tablespace_values
                            ORDER BY TSTP DESC
                           )
                       WHERE rownum <= (select count(distinct name) from tablespace_values) * 30
                       ORDER BY rownum DESC`);
};

module.exports.group_history = (time) => {
    return db.execute(`SELECT *
                       FROM (
                             SELECT
                                NAME as "name",
                                TOTAL as "total",
                                FREE as "free",
                                USED as "used",
                                PERCENTAGE_FREE as "percentage_free",
                                PERCENTAGE_USED as "percentage_used",
                                TSTP as "tstp"
                            FROM view_tablespace_values_per_${time}
                            ORDER BY TSTP DESC
                           )
                       WHERE rownum <= (select count(distinct name) from view_tablespace_values_per_${time}) * 30
                       ORDER BY rownum DESC`);
};
