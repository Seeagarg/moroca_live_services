const express = require('express');
const { CheckRedirect, FetchArtistController, FetchVideosById, FetchSingleVideoById, FetchRelatableVideo } = require('../MadFunny/madfunny.controller');

const router = express();

router.get('/redirect',CheckRedirect)
router.get('/fetchArtist',FetchArtistController)
router.get('/fetchVideos/:id', FetchVideosById)
router.get('/fetchsingle/:id',FetchSingleVideoById)
router.get('/common/:id',FetchRelatableVideo)



module.exports = router