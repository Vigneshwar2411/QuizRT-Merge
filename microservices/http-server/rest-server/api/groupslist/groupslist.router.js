var router = require('express').Router();
var controller = require('./groupslist.controller');

// router.get('/:uid',controller.getfriendslist);
router.get('/:uid',controller.getgroupslist);
router.post('/addgroup',controller.addgroup);

exports = module.exports = router;
