const express = require('express');
const { getCategoriesVideos, getCategory, FetchWatchlist, getCatVideos, getSingleVideo, fetchRelatedVideo, videoLike, unlikeVideo, addToWatchlist, removeFromWatchlist } = require('./tt.controller');

const router = express.Router();

router.get('/getcatvideos/:service',getCategoriesVideos)
router.get('/getCategory/:service',getCategory)
router.get('/getTTWatchlist/:ani/:service',FetchWatchlist)
router.get('/catVideos/:id',getCatVideos)
router.get('/ttsinglevideo/:id',getSingleVideo)
router.get('/ttrelated/:id',fetchRelatedVideo)


router.post('/likevideo',videoLike)
router.delete('/unlikevideo',unlikeVideo)
router.post('/ttaddwatchlist',addToWatchlist)
router.delete('/ttremove',removeFromWatchlist)









module.exports = router