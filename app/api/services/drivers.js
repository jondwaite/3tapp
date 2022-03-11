const db = require('./db');
const helper = require('../helper');

async function getAll(){
    const rows = await db.query(
        `SELECT * FROM drivers`
    );
    const data = helper.emptyOrRows(rows);
    return { data }
}

async function getOne(driverId){
    const row = await db.query(
        `SELECT * FROM drivers WHERE driverId = ${driverId}`
    );
    const data = helper.emptyOrRows(row);
    return { data }
}

async function getDetails(driverId){
    const data = {};
    const places = {};
    const grid = {};

    // Career race starts
    const starts = await db.query(`SELECT COUNT(raceId) AS 'starts' FROM results WHERE driverId = ${driverId}`);
    data['starts'] = starts[0].starts;

    // Career total points
    const points = await db.query(`SELECT SUM(points) AS 'points' FROM results WHERE driverId = ${driverId}`);
    data['points'] = points[0].points;

    // Career results
    const placings = await db.query(
        `SELECT positionText,count(*) AS 'finishes' FROM (SELECT * FROM results WHERE driverId = ${driverId}) AS FREQUENCY GROUP BY position;`
    );
    placings.forEach(item => places[item['positionText']] = item['finishes']);
    data['finishes'] = places;

    // Career grid positions
    const grids = await db.query(        
        `SELECT grid,count(*) AS 'times' from (SELECT grid FROM results WHERE driverId = ${driverId}) AS FREQUENCY GROUP BY grid;`
    );
    grids.forEach(item => grid[item['grid']] = item['times']);
    data['grid'] = grid;

    return { data }
}

module.exports = {
    getAll,
    getOne,
    getDetails
}
