const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(){

    const rows = await db.query(
        `SELECT * FROM drivers`
    );
    const data = helper.emptyOrRows(rows)

    return {
        data
    }
}

module.exports = {
    getAll
}
