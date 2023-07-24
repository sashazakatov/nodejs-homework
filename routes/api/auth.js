const express = require('express')
const { auth } = require('../../controllers')
const { authorization, validateBody, upload } = require('../../middlewares');
const { usersSchemes } = require('../../schemes');

const router = express.Router()

router.patch('/', authorization, validateBody(usersSchemes.subscriptionScheme), auth.updateSubscription);

router.post('/register', validateBody(usersSchemes.registerScheme), auth.registUser);

router.post('/login', validateBody(usersSchemes.registerScheme), auth.login);

router.patch('/logout', authorization, auth.logout);

router.get('/current', authorization, auth.current);

router.patch('/avatars', authorization, upload.single('avatars'), auth.updateAvatars);

router.get('/verify/:verificationToken', auth.verifyEmail);

router.post('/verify', validateBody(usersSchemes.emailScheme), auth.resendVerifyEmail);

module.exports = router;