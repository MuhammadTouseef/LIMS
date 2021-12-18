const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const connection = require("../config/db");
var jwt = require("jsonwebtoken");
const { SODA_COLL_MAP_MODE } = require("oracledb");
var generator = require('generate-password');

exports.addtest = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const { testname, sample, time, cost } = req.body;
    const tm = parseInt(time);
    const cs = parseInt(cost);
    const resu = await con.execute(
      `insert into TEST (TESTNAME, SAMPLEREQUIRE, REPORTINGDAYS, COST)
values (:a,:b,:c,:d)`,
      [testname, sample, tm, cs],
      { autoCommit: true }
    );
    await con.close();
    res.status(200).json({
      status: "Success",
      message: "Addedd Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});


exports.getall = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     
      const resu = await con.execute(
        `SELECT TESTNAME,TESTID FROM TEST`
      );
      await con.close();
      res.status(200).json(resu.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });
  
  
  exports.addtestdata = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     const {test,sample,desc,unit,pt} = req.body;
      const resu = await con.execute(
        `insert into TESTDATA (NAME, SAMPLEVALUE, "desc", UNIT, TEST_TESTID)
        values (:a,:b,:c,:d,:e)`,[test,sample,desc,unit,pt],
        { autoCommit: true }
      );
      await con.close();
      res.status(200).json({
        status: "Success",
        message: "Added Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });
  
  
   
  exports.addrole = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     const {role} = req.body;
     const rid = Math.floor(Math.random() * 9999999)
      const resu = await con.execute(
        `insert into NEWLIMS.ROLES (ROLEID, NAME)
        values (:a,:b)`,[rid,role],
        { autoCommit: true }
      );
      await con.close();
      res.status(200).json({
        status: "Success",
        message: "Added Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });
  
  
    
   
  exports.addrolepermission = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     const {title} = req.body;
  
      const resu = await con.execute(
        `insert into ROLEPERMISSIONS (TITLE)
        values (:a)`,[title],
        { autoCommit: true }
      );
      await con.close();
      res.status(200).json({
        status: "Success",
        message: "Added Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });
  
  exports.testlistop = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     
  
      const resu = await con.execute(
        `SELECT TESTNAME,TESTID FROM TEST`
      );
      const data = resu.rows;
      let rf = []
      data.map(a => {
          let x = {
             value: a[1],
             label: a[0] 
          }
          rf.push(x)
      })
      await con.close();
      res.status(200).json(rf);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });
  


    
  exports.addbill = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     
     const {tests, pid} = req.body;
const patid = parseInt(pid)
     const values = tests.map(a => a['value'])
var totalcost = 0;
 
 await Promise.all(
  values.map(async (one) => {
    let resu = await con.execute(
        `select cost from test where TESTID = :a
        `,[one]

      );
   
     
      totalcost += parseInt(resu.rows[0][0])
      
  })
 );
 const tax = parseInt(totalcost*0.17) 
 const grandtotal = totalcost+tax
 var password = generator.generate({
	length: 12,
	numbers: true,
    strict: true
});

const tok = jwt.verify(req.headers['x-emp-ath'], process.env.JWT_SECRET);
const eid = parseInt(tok.id);
const options = {
    bindDefs: [
      { type: oracledb.NUMBER },
      { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 20 }
    ]
  };
let resu = await con.execute(`insert into BILL ( COST, TAXES, TOTAL, EMPLOYEE_EMPLOYEE_ID, PATIENT_PATIENTID, PASSWORD)
values (:a,:b,:c,:d,:e,:f) ` , [totalcost, tax, grandtotal, eid, patid, password],
{ autoCommit: true })
console.log(resu.rowsAffected)

      await con.close();
      res.status(200).json({
        status: "Success",
        message: "Added Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });