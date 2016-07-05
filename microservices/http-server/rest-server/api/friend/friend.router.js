const router = require('express').Router();
const friendController = require('./friend.controller');
const context = require('../../context');

router.post('/',friendController.sendRequest);
router.post('/',friendController.addAsFriend);

exports = module.exports = router;
