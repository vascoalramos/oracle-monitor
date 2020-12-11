const db = require("../resources/database");

module.exports.list = () => {
    return db.execute('SELECT NAME as "name", CON_ID as "con_id" FROM pdb_mat_view');
};

module.exports.list_history = () => {
    return db.execute(
        'SELECT NAME as "name", CON_ID as "con_id", TOTAL_SIZE as "size", TSTP as "tstp" FROM pdb_history',
    );
};
