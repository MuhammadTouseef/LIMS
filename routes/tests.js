const express = require('express');
const { addtest, getall, addtestdata, addrole, addrolepermission, testlistop, addbill, addsample, sampleresult, getallsamples, comp, search, updatetest } = require('../controllers/tests');



const router = express.Router();

router.post('/', addtest)
router.post('/update', updatetest)
router.get('/',getall)
router.post('/addtestdata', addtestdata)
router.post('/addrole', addrole)
router.post('/addrolepermission', addrolepermission)
router.get('/listop',testlistop)
router.post('/addbill', addbill)
router.post('/addsample', addsample)
router.post('/addsampleresult', sampleresult)
router.get('/getallsamples', getallsamples)
router.get('/all', comp)
router.post('/search',search)
module.exports = router;