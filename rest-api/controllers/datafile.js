const db = require("../resources/database");

module.exports.list = () => {
    return db.execute('SELECT TABLESPACE_NAME as "tablespace_name", DATAFILE_NAME as "datafile_name" FROM datafile');
};

module.exports.filter_history = (tablespace_name) => {
    return db.execute(`SELECT
                            datafile.DATAFILE_NAME as "datafile_name",
                            TOTAL as "total",
                            FREE as "free",
                            USED as "used",
                            PERCENTAGE_FREE as "percentage_free",
                            PERCENTAGE_USED as "percentage_used",
                            TSTP as "tstp"
                       FROM datafile
                            INNER JOIN datafile_values on datafile.datafile_name=datafile_values.datafile_name
                       WHERE TABLESPACE_NAME='${tablespace_name}'`);
};

module.exports.list_histor = () => {
    return db.execute(
        `SELECT
            DATAFILE_NAME as "datafile_name",
            TOTAL as "total",
            FREE as "free",
            USED as "used",
            PERCENTAGE_FREE as "percentage_free",
            PERCENTAGE_USED as "percentage_used",
            TSTP as "tstp"
         FROM datafile_values`,
    );
};
