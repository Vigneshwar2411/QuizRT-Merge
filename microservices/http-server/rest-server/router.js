var router = require('express').Router();

router.use('/account', require('./api/account/account.router'));
router.use('/authenticate', require('./api/authenticate/authenticate.router'));
router.use('/profile', require('./api/profile/profile.router'));

exports = module.exports = router;
