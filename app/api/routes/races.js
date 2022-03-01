const express = require('express');
const router = express.Router();
const races = require('../services/races');

/* GET races */
router.get('/', async function(req, res, next) {
    try {
        let returnedData = await races.getAll();
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting races `, err.message);
        next(err);
    };
});

router.get('/:raceId', async function(req, res, next) {
    try {
        let returnedData = await races.getOne(req.params.raceId);
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting race with Id=${req.params.raceId}`, err.message);
        next(err);
    };
});

module.exports = router;