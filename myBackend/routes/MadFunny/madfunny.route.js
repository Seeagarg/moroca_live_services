const express = require('express');
const { FetchArtistController, CheckRedirect, FetchVideosById, FetchSingleVideoById,FetchRelatableVideo } = require('./madfunny.controller');

const router = express.Router();

router.get('/fetchArtist', FetchArtistController)
router.get('/redirect',CheckRedirect)
router.get('/fetchVideos/:id', FetchVideosById)
router.get('/fetchsingle/:id',FetchSingleVideoById)
router.get('/common/:id',FetchRelatableVideo)





module.exports = router