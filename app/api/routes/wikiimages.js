const express = require('express');
const router = express.Router();
const wikiimages = require('../services/wikiimages');

router.get('/:name', async function(req, res, next) {
    try {
        const response = await wikiimages.getImageLink(req.params.name);
        var key = Object.keys(response.data.query.pages)
        try {
            url = {'url': response.data.query.pages[key].thumbnail.source};
        } catch {
            url = {'url': ''};
        }
        res.json(url);
    } catch (err) {
        console.error(`Error while searching wikipeda for image with name='${req.params.name}'`, err.message);
        next(err);
    };
});

module.exports = router;
