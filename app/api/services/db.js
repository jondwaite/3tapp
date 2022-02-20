const mariadb = require('mariadb');
const config = require('../config');
const pool = mariadb.createPool(config.db);

async function query(sql, params) {
    const connection = await pool.getConnection();
    const results = await connection.query(sql);
    connection.end();

    return results;
}

module.exports = {
    query
}
