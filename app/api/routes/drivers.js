const express = require('express');
const router = express.Router();
const drivers = require('../services/drivers');

router.get('/:driverId/results', async function(req, res, next) {
    try {
        let return1 = await drivers.getDetails(req.params.driverId);
        let return2 = await drivers.getOne(req.params.driverId);
        res.json({...return1.data, ...return2.data[0]});
    } catch (err) {
        console.error(`Error while getting results with driverId=${req.params.driverId}`, err.message);
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

module.exports = router;