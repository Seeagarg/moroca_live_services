const express = require('express');
const { CheckRedirect } = require('../MadFunny/madfunny.controller');
const { getMemeCategories, getRandomMeme, LikeMeme, DeleteLike, getMemeValue, searchMemesByCategoryName } = require('./Meme.controller');

const router = express();


router.get('/redirect',CheckRedirect)
router.get('/getMemeCategories', getMemeCategories);
router.get('/random',getRandomMeme)
router.post('/postlike',LikeMeme)
router.delete('/unlike',DeleteLike)
router.get('/getMemeValue/:id',getMemeValue);
router.get('/searchMeme',searchMemesByCategoryName)







module.exports = router