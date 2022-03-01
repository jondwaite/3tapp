const express = require('express');
const router = express.Router();
const drivers = require('../services/drivers');

/* GET drivers */
router.get('/', async function(req, res, next) {
    try {
        let returnedData = await drivers.getAll();
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting drivers `, err.message);
        next(err);
    };
});

router.get('/:driverId', async function(req, res, next) {
    try {
        let returnedData = await drivers.getOne(req.params.driverId);
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting driver with Id=${req.params.driverId}`, err.message);
        next(err);
    };
});

module.exports = router;