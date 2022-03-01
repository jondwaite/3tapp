const express = require('express');
const router = express.Router();
const circuits = require('../services/circuits');

/* GET circuits */
router.get('/', async function(req, res, next) {
    try {
        let returnedData = await circuits.getAll()
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting circuits `, err.message);
        next(err);
    };
});

router.get('/:circuitId', async function(req, res, next) {
    try {
        let returnedData = await circuits.getOne(req.params.circuitId);
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting circuit with Id=${req.params.circuitId}`, err.message);
        next(err);
    };
});

module.exports = router;