const mariadb = require('mariadb');
const config = require('../config');
const pool = mariadb.createPool(config.db);

async function query(sql, params) {
    const connection = await pool.getConnection();
    const res = connection.query(sql);
    connection.release();
    
    let results = await res;

    return results;
}

module.exports = {
    query
}
