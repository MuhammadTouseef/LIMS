const express = require('express')
const {register, login,  navbar} = require('../controllers/auth')

const router = express.Router();


router.post('/empreg',register)

router.post('/emplogin',login)

router.get('/nav', navbar)


module.exports = router;