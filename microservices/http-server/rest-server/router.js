var router = require('express').Router();

router.use('/account', require('./api/account/account.router'));
router.use('/authenticate', require('./api/authenticate/authenticate.router'));
router.use('/signup', require('./api/signup/signup.router'));
router.use('/timeline', require('./api/timeline/timeline.router'));


exports = module.exports = router;
