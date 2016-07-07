// var router = require('express').Router();
//
// router.use('/user',require('./user/user.router'));
// router.use('/tournament',require('./tournament/tournamentpost.router'));
//
// exports = module.exports = router;
const router = require('express').Router();
timelineController = require('./timeline.controller');
router.post('/createpost',timelineController.writePost);
router.get('/posts/all/:parentId',timelineController.retrievePostsById);
router.delete('/posts/:postId',timelineController.deletePostByIDPost);
exports = module.exports = router;
