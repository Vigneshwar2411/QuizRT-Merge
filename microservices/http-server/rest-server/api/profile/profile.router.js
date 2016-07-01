const router = require('express').Router();
const profileController = require('./profile.controller');
const context = require('../../context');

router.get('/',profileController.myprofile);

exports = module.exports = router;
