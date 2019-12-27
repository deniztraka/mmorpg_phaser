const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const CharacterModel = require('../models/characterModel');

const router = express.Router();

router.post('/createCharacter', asyncMiddleware(async(req, res, next) => {
    var createCharacterRequestBody = req.body;
    await CharacterModel.create(createCharacterRequestBody);
    res.status(200).json({
        status: 'ok'
    });
}));


router.get('/getCharacters', asyncMiddleware(async(req, res, next) => {
    if (queryObject) {
        var characters = await CharacterModel.find({
            email: req.user.email
        }, {
            email: true,
            name: true,
            class: true
        });

        res.render('characterList', { characterList: characters });
    } else {
        res.status(400).json({
            status: 'bad request'
        });
    }


}));


module.exports = router;