const db = require('./db');
const helper = require('../helper');

async function getAll(){

    const rows = await db.query(
        `SELECT * FROM circuits`
    );
    const data = helper.emptyOrRows(rows);

    return { data }
}

async function getAllAug(){
    const rows = await db.query(
        `SELECT *,(SELECT COUNT(*) FROM races WHERE circuitId=circuits.circuitId) as Races FROM circuits;`
    );
    const data = helper.emptyOrRows(rows);

    return { data }
}

async function getOne(circuitId){

    const row = await db.query(
        `SELECT * FROM circuits WHERE circuitId = ${circuitId}`
    );
    const data = helper.emptyOrRows(row);

    return { data }
}

module.exports = {
    getAll,
    getAllAug,
    getOne
}
