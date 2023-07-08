const express = require('express')

const router = express.Router()

router.post('/register', (req, res, next) => {
    console.log('/register');
    res.json({massage: 'hellow'});
});


module.exports = router;