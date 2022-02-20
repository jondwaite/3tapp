const express = require('express');
const router = express.Router();
const drivers = require('../services/drivers');

/* GET drivers */
router.get('/', async function(req, res, next) {
    try {
        res.json(await drivers.getAll());
    } catch (err) {
        console.error(`Error while getting drivers `, err.message);
        next(err);
    }
});

module.exports = router;