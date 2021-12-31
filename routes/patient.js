const express = require('express');
const { patient, addpatient, patientdetails, getallpatient, editpatient,  searchp } = require('../controllers/patient');


const router = express.Router();

router.post('/', patient)
router.post('/addpatient', addpatient)
router.post('/editpatient', editpatient)
router.post('/details', patientdetails)
router.get('/allpt', getallpatient)
router.post('/search', searchp)

module.exports = router;