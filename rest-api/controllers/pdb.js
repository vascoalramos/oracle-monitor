const db = require("../resources/database");

module.exports.findAll = () => {
    return db.execute(
        'SELECT NAME as "name", CON_ID as "con_id", TOTAL_SIZE as "size", TSTP as "tstp" FROM pdb_history',
    );
};
