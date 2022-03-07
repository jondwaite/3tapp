const db = require('./db');
const helper = require('../helper');

async function getAll(){
    const rows = await db.query(
        `SELECT * FROM races`
    );
    const data = helper.emptyOrRows(rows);
    return { data };
};

async function getYears(){
    const rows = await db.query(
        `SELECT DISTINCT(year) from races ORDER BY year ASC;`
    );
    const data = helper.emptyOrRows(rows);
    return { data };
};

async function getYear(year){
    const row = await db.query(
        `SELECT * FROM races WHERE year = ${year} ORDER BY round ASC;`
    );
    const data = helper.emptyOrRows(row);
    return { data };
};

async function getById(id){
    const row = await db.query(
        `SELECT * FROM races WHERE raceId = ${id};`
    )
    const data = helper.emptyOrRows(row);
    return { data };
};

module.exports = {
    getAll,
    getYears,
    getYear,
    getById
};

// Queries:
// select distinct(year) from races ORDER BY year ASC; - Year dropdown for races
// select raceId,round,name from races where year=2022 ORDER BY round ASC; - Rounds for a year