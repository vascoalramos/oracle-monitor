const db = require("../resources/database");

module.exports.list = () => {
    return db.execute('SELECT TABLESPACE_NAME as "tablespace_name", DATAFILE_NAME as "datafile_name" FROM datafile');
};

module.exports.filter = (tablespace_name) => {
    return db.execute(`SELECT
                            TABLESPACE_NAME as "tablespace_name",
                            datafile.DATAFILE_NAME as "datafile_name"
                       FROM datafile
                       WHERE TABLESPACE_NAME='${tablespace_name}'`);
};

module.exports.list_history = () => {
    return db.execute(
        `SELECT
            TABLESPACE_NAME as "tablespace_name",
            DATAFILE_NAME as "datafile_name",
            TOTAL as "total",
            FREE as "free",
            USED as "used",
            PERCENTAGE_FREE as "percentage_free",
            PERCENTAGE_USED as "percentage_used",
            TSTP as "tstp"
         FROM datafile_values
         ORDER BY TSTP`,
    );
};
