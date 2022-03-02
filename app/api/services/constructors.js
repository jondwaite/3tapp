const db = require('./db');
const helper = require('../helper');

async function getAll(){

    const rows = await db.query(
        `SELECT * FROM constructors`
    );
    const data = helper.emptyOrRows(rows);

    return {
        data
    }
}

async function getOne(constructorId){

    const row = await db.query(
        `SELECT * FROM constructors WHERE constructorId = ${constructorId}`
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
