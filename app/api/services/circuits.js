const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAll(){

    const rows = await db.query(
        `SELECT * FROM circuits`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getOne(circuitId){

    const row = await db.query(
        `SELECT * FROM circuits WHERE circuitId = ${circuitId}`
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
