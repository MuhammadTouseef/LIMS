const express = require('express');
const { patient } = require('../controllers/patient');


const router = express.Router();

router.post('/', patient)

module.exports = router;