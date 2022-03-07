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

router.get('/years', async function(req, res, next) {
    try {
        let returnedData = await races.getYears();
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting years from races `, err.message);
    };
});

router.get('/:id', async function (req, res, next) {
    try {
        let returnedData = await races.getById(req.params.id);
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting race with Id:${req.params.id} `, err.message);
    };
});

router.get('/year/:year', async function(req, res, next) {
    try {
        let returnedData = await races.getYear(req.params.year);
        res.json(returnedData.data);
    } catch (err) {
        console.error(`Error while getting races from year=${req.params.year}`, err.message);
        next(err);
    };
});

module.exports = router;