const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const CharacterModel = require('../models/characterModel');

const router = express.Router();

router.post('/createCharacter', asyncMiddleware(async (req, res, next) => {
    console.log(req.body);
    //await CharacterModel.create({ email }, { name: score });
    res.status(200).json({
        status: 'ok'
    });
}));


router.get('/getCharacters', asyncMiddleware(async (req, res, next) => {
    var queryObject = req.query;
    if (queryObject) {
        var characters = await CharacterModel.find({
            email: queryObject.email
        }, {
            email: true,
            name: true,
            class: true
        });

        res.status(200).json({
            status: 'ok',
            characters: characters
        });
    }else{
        res.status(400).json({
            status: 'bad request'
        });
    }

    
}));


module.exports = router;