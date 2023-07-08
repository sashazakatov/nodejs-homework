const express = require('express')
const { user } = require('../../../controllers')

const router = express.Router()

router.post('/register', user.registUser);


module.exports = router;