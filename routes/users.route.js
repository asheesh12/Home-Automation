var express = require('express');
var router = express.Router();

router.post('/:userId/sign-in', userController.signIn);
router.post('/sign-up', userController.signUp);
router.put('/:userId/password-update', userController.signUp);
router.get('/:userId', userController.getUserDetails);

module.exports = router;