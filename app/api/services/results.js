const db = require('./db');
const helper = require('../helper');
const config = require('../config');

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
        `SELECT * FROM results WHERE resultsId = ${resultId}`
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
