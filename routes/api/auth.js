const express = require('express')
const { auth } = require('../../controllers')
const { authorization } = require('../../middlewares');

const router = express.Router()

router.post('/register', auth.registUser);

router.post('/login', auth.login);

router.patch('/logout', authorization, auth.logout);

router.get('/current', authorization, auth.current);

module.exports = router;