const express = require('express');
const { addtest, getall, addtestdata, addrole, addrolepermission, testlistop, addbill } = require('../controllers/tests');



const router = express.Router();

router.post('/', addtest)
router.get('/',getall)
router.post('/addtestdata', addtestdata)
router.post('/addrole', addrole)
router.post('/addrolepermission', addrolepermission)
router.get('/listop',testlistop)
router.post('/addbill', addbill)

module.exports = router;