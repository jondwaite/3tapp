const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(){

    const rows = await db.query(
        `SELECT * FROM races`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getOne(raceId){

    const row = await db.query(
        `SELECT * FROM races WHERE raceId = ${raceId}`
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
