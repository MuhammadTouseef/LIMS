const express = require('express')
const {register, login} = require('../controllers/auth')

const router = express.Router();


router.post('/empreg',register)

router.get('/emplogin',login)


module.exports = router;