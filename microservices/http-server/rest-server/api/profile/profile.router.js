const router = require('express').Router();
const profileController = require('./profile.controller');
const context = require('../../context');

router.get('/:username',profileController.getProfile);
router.post('/:id/friends', profileController.addFriend);
router.put('/', profileController.editProfile);

exports = module.exports = router;
