const express = require('express')
const {register, login,  navbar, getroles, getroleper, deleteroles, searchroles, getassignper, addassignper, deleteasp} = require('../controllers/auth')

const router = express.Router();


router.post('/empreg',register)

router.post('/emplogin',login)

router.get('/nav', navbar)
router.get('/role', getroles)
router.get('/roleper', getroleper)
router.post('/search', searchroles)
router.post('/delrole', deleteroles)
router.post('/getassign', getassignper)
router.post('/addassign', addassignper)
router.post('/deleteasp', deleteasp)
module.exports = router;