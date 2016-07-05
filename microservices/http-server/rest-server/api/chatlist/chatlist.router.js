var router = require('express').Router();
var controller = require('./chatlist.controller');

router.get('/users/:uid',controller.getfriendslist);
router.get('/groups/:uid',controller.getgroupslist);
router.post('/addgroup',controller.addgroup);

exports = module.exports = router;
