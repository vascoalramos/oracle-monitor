const oracledb = require("oracledb");
const dbConfig = require("../config/database.js");

module.exports.checkConnection = async () => {
    let conn;
    try {
        conn = await oracledb.getConnection(dbConfig);
    } catch (err) {
        console.error("Connection failed: database conn not available!");
        process.exit(1);
    } finally {
        if (conn) {
            // conn assignment worked, need to close
            try {
                await conn.close();
            } catch (err) {
                console.error(err.message);
            }
        }
    }
};

module.exports.execute = async function (statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
        let conn;

        opts.outFormat = oracledb.OBJECT;
        opts.autoCommit = true;

        try {
            conn = await oracledb.getConnection(dbConfig);

            const result = await conn.execute(statement, binds, opts);

            resolve(result.rows);
        } catch (err) {
            reject(err);
        } finally {
            if (conn) {
                // conn assignment worked, need to close
                try {
                    await conn.close();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
};
