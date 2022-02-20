const mariadb = require('mariadb/promise');
const config = require('../config');

async function query(sql, params) {
    const connection = await mariadb.createConnection(config.db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    query
}