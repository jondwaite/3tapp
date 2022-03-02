const db = require('./db');
const helper = require('../helper');

async function getAll(){

    const rows = await db.query(
        `SELECT * FROM drivers`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getOne(driverId){

    const row = await db.query(
        `SELECT * FROM drivers WHERE driverId = ${driverId}`
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
