const db = require('./db');
const helper = require('../helper');

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

// Queries:
// select distinct(year) from races ORDER BY year ASC; - Year dropdown for races
// select raceId,round,name from races where year=2022 ORDER BY round ASC; - Rounds for a year