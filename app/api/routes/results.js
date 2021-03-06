const express = require('express');
const router = express.Router();
const results = require('../services/results');

/* GET reaults */
router.get('/', async function(req, res, next) {
    try {
        let returnedData = await results.getAll();
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting results `, err.message);
        next(err);
    };
});

router.get('/:resultId', async function(req, res, next) {
    try {
        let returnedData = await results.getOne(req.params.resultId);
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting result with Id=${req.params.resultId}`, err.message);
        next(err);
    };
});

module.exports = router;