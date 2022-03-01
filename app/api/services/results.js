const db = require('./db');
const helper = require('../helper');

async function getAll(){

    const rows = await db.query(
        `SELECT * FROM results`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getOne(resultId){

    const row = await db.query(
        `SELECT * FROM results WHERE resultId = ${resultId}`
    );
    const data = helper.emptyOrRows(row);

    return {
        data
    }
}

module.exports = {
    getAll,
    getOne
}
