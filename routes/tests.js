const express = require('express');
const { addtest, getall, addtestdata, addrole, addrolepermission, testlistop, addbill, addsample, sampleresult } = require('../controllers/tests');



const router = express.Router();

router.post('/', addtest)
router.get('/',getall)
router.post('/addtestdata', addtestdata)
router.post('/addrole', addrole)
router.post('/addrolepermission', addrolepermission)
router.get('/listop',testlistop)
router.post('/addbill', addbill)
router.post('/addsample', addsample)
router.post('/addsampleresult', sampleresult)

module.exports = router;