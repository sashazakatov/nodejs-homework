const express = require('express')
const { auth } = require('../../controllers')

const router = express.Router()

router.post('/register', auth.registUser);

router.post('/login', auth.login);

module.exports = router;