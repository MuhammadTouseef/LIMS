const express = require('express');
const { patient, addpatient, patientdetails } = require('../controllers/patient');


const router = express.Router();

router.post('/', patient)
router.post('/addpatient', addpatient)
router.post('/details', patientdetails)

module.exports = router;