const express = require('express');
const router = express.Router();
const constructors = require('../services/constructors');

/* GET constructors */
router.get('/', async function(req, res, next) {
    try {
        res.json(await constructors.getAll());
    } catch (err) {
        console.error(`Error while getting constructors `, err.message);
        next(err);
    };
});

router.get('/:constructorId', async function(req, res, next) {
    try {
        res.json(await constructors.getOne(req.params.constructorId));
    } catch (err) {
        console.error(`Error while getting constructor with Id=${req.params.constructorId}`, err.message);
        next(err);
    };
});

module.exports = router;