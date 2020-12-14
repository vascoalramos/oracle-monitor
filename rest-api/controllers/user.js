const db = require("../resources/database");

module.exports.list = () => {
    return db.execute(`SELECT
                            USER_ID as "id",
                            USERNAME as "name",
                            ACCOUNT_STATUS as "status",
                            DEFAULT_TABLESPACE as "default_tablespace",
                            TEMP_TABLESPACE as "temp_tablespace",
                            LAST_LOGIN as "last_login"
                       FROM users`);
};
