const db = require("../resources/database");

module.exports.list_history = () => {
    return db.execute('SELECT TOTAL as "total", USED as "used", TSTP as "tstp" FROM memory_history');
};
