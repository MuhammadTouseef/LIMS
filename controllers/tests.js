const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const connection = require("../config/db");
var jwt = require("jsonwebtoken");
const { SODA_COLL_MAP_MODE } = require("oracledb");
var uniqid = require('uniqid'); 
var generator = require('generate-password');
const moment = require("moment");
var easyinvoice = require('easyinvoice');
const base64 = require('base64topdf');
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



exports.updatetest = asyncHandler(async (req, res, next) => {
  try {
 
    let con = await oracledb.getConnection(connection());
    const { testname, sample, time, cost, testid } = req.body;
    const tm = parseInt(time);
    const cs = parseInt(cost);
    console.log(testid)
    const resu = await con.execute(
      `
UPDATE TEST SET TESTNAME = :a,
SAMPLEREQUIRE = :b,
REPORTINGDAYS = :c,
COST = :d
WHERE TESTID = :d
`,
      [testname, sample, tm, cs, testid],
      { autoCommit: true }
    );
    await con.close();
    res.status(200).json({
      status: "Success",
      message: "Updated Successfully",
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
  
  

  
exports.comp = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   
    const resu = await con.execute(
      `SELECT * FROM TEST`
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



  
exports.search = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   const {value} = req.body;
   const val = `%${value}%`
    const resu = await con.execute(
      `SELECT * FROM TEST WHERE TESTNAME LIKE :a `
    ,[val]);
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
 console.log(grandtotal)
 var password = generator.generate({
	length: 12,
	numbers: true,
    strict: true
});

const tok = jwt.verify(req.headers['x-emp-ath'], process.env.JWT_SECRET);
const eid = parseInt(tok.id);

let resu = await con.execute(`insert into BILL ( COST, TAXES, TOTAL, EMPLOYEE_EMPLOYEE_ID, PATIENT_PATIENTID, PASSWORD)
values (:a,:b,:c,:d,:e,:f) ` , [totalcost, tax, grandtotal, eid, patid, password],
{ autoCommit: true })

let billid = await con.execute(`SELECT max(BILLID) FROM BILL ` )
billid = parseInt(billid.rows[0][0]) 
await Promise.all(
    values.map(async (one) => {
      let resu = await con.execute(
          `insert into BILL_TEST (BILL_BILLID, TEST_TESTID)
          values (:a,:b)
          `,[billid, one],{ autoCommit: true }
  
        );   
       
       
        
    })
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




      
   
  exports.addsample = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     const { status, patientid, billid, testid} = req.body;
     const tok = jwt.verify(req.headers['x-emp-ath'], process.env.JWT_SECRET);
const  empid = parseInt(tok.id);
     var currentDate = new Date();
  const takenat = moment(currentDate).format('YYYY-MM-DD HH:mm:ss')

      const resu = await con.execute(
        `insert into NEWLIMS.SAMPLE ( TAKENAT, STATUS, EMPLOYEE_EMPLOYEE_ID, BILL_BILLID,
          TEST_TESTID)
values (TO_DATE(:a, 'YYYY-MM-DD HH24:MI:SS'),:b,:d,:e,:f)`,[takenat,status,empid,billid,testid],
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



  
  exports.sampleresult = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     const { result, comment, sampleid} = req.body;
     const tok = jwt.verify(req.headers['x-emp-ath'], process.env.JWT_SECRET);
     const  empid = parseInt(tok.id);
     var currentDate = new Date();
  const takenat = moment(currentDate).format('YYYY-MM-DD HH:mm:ss')
      let resu = await con.execute(
        `insert into SAMLERESLTS (RESULT, COMNT,  SAMPLE_SAMPLEID)
        values (:a,:b,:c)`,[result,comment,sampleid],
        { autoCommit: true }
      );

      resu = await con.execute(
        `SELECT MAX(ID) FROM SAMLERESLTS`
      );
      const sampleresid = resu.rows[0][0]
      resu = await con.execute(
        `SELECT BILL_BILLID, TEST_TESTID FROM SAMPLE
        WHERE  SAMPLEID = :a`,[sampleid]
      );

      const billid = resu.rows[0][0]
      const testid = resu.rows[0][1]
      resu = await con.execute(
        `SELECT PATIENTID FROM BILL JOIN PATIENT P on P.PATIENTID = BILL.PATIENT_PATIENTID
        WHERE BILLID = :a`,[billid]
      );
      const pid = resu.rows[0][0]
      const rid = uniqid('LIMS-')
      resu = await con.execute(
        `insert into NEWLIMS.REPORT ( REPORTID, PATIENT_PATIENTID, EMPLOYEE_EMPLOYEE_ID, GENERATEDAT, SAMPLE_SAMPLEID,
          BILL_BILLID, TEST_TESTID)
values (:z,:a,:b,TO_DATE(:c, 'YYYY-MM-DD HH24:MI:SS'),:d,:e,:f)`,[rid,pid,empid,takenat,sampleid,billid,testid],{
  autoCommit: true
}
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




  exports.getallsamples = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     
  
      const resu = await con.execute(
        `SELECT SAMPLEID, TAKENAT, STATUS, BILLID, FIRST_NAME, LAST_NAME , PATIENT_PATIENTID
        FROM SAMPLE JOIN BILL B on B.BILLID = SAMPLE.BILL_BILLID JOIN PATIENT P on P.PATIENTID = B.PATIENT_PATIENTID
        ORDER BY SAMPLEID DESC`
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



  


  exports.getallbills = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     
  
      const resu = await con.execute(
        `SELECT BILLID, PATIENTID, FIRST_NAME,  LAST_NAME , PASSWORD, COST, TAXES, TOTAL FROM BILL JOIN
        PATIENT P on P.PATIENTID = BILL.PATIENT_PATIENTID
    ORDER BY BILLID DESC `
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
  


  

  exports.billsearch = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     let {value} = req.body
  
      const resu = await con.execute(
        `SELECT BILLID, PATIENTID, FIRST_NAME,  LAST_NAME , PASSWORD, COST, TAXES, TOTAL FROM BILL JOIN
        PATIENT P on P.PATIENTID = BILL.PATIENT_PATIENTID
        WHERE BILLID = :a
    ORDER BY BILLID DESC `,[value]
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
  
  

  

  exports.getinvoice = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
     
  // const {billid} = req.body;
  const billid = req.params.id;
      const resu = await con.execute(
        `SELECT  PATIENTID, FIRST_NAME,  LAST_NAME , PASSWORD, COST, TAXES, TOTAL FROM BILL JOIN
        PATIENT P on P.PATIENTID = BILL.PATIENT_PATIENTID
WHERE BILLID = :a
    ORDER BY BILLID DESC
`,[billid]
      );

      const billdetails = await con.execute(
        `
        SELECT TESTID, TESTNAME, TEST.COST FROM TEST JOIN BILL_TEST BT on TEST.TESTID = BT.TEST_TESTID JOIN BILL B on BT.BILL_BILLID = B.BILLID
WHERE BILLID = :a
        `,[billid]
      );
      await con.close();
     let tabl = ''

     billdetails.rows.map((e)=>{
       let x = ` 

       <tr>
       <td>${e[0]}</td>
       <td>${e[1]}</td>
       <td>Rs ${e[2]}</td>
       </tr>
       `
       tabl += x
   
     })
     let tablep = `
 
     <table>
  <tr>
    <th>Test ID</th>
    <th>Test Name</th>
    <th>Cost</th>
  </tr>
  ${tabl}
</table>
     `
    const htm = `
    <style>
    table, th, td {
      border: 1px solid black;

    }
    @media print {
      #printPageButton {
        display: none;
      }
    }
    </style>
    <div><button id="printPageButton" onClick="window.print()">Print Bill
    </button></div>
    <h1>LIMS</h1>
   
    <h2>Bill-ID # ${billid}</h2>
    <h3>Patient ID: ${resu.rows[0][0]} </h3>
    <h3>Patient Name: ${resu.rows[0][1]} ${resu.rows[0][2]} </h3>
    <h3>Bill Password: ${resu.rows[0][3]} </h3>
    <br>
 ${tablep}
 <h3>Total: Rs ${resu.rows[0][4]} </h3>
 <h3>Taxes: Rs ${resu.rows[0][5]} </h3>
 <h1>Grand Total: Rs ${resu.rows[0][6]} </h3>
 <br/>
 
    `
    

      res.status(200).send(htm)
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });
  


  
  

  exports.qa = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
   
  
      const resu = await con.execute(
        `SELECT REPORTID, PATIENT_PATIENTID, BILL_BILLID FROM REPORT
        ORDER BY BILL_BILLID DESC `
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
  
  


    

  exports.getreport = asyncHandler(async (req, res, next) => {
    try {
      let con = await oracledb.getConnection(connection());
    //  const reportid = 'LIMS-ppi3e7oskxvta356'
  // const {billid} = req.body;
  const reportid = req.params.reportid;
      const resu = await con.execute(
        `
        SELECT REPORTID,
       PATIENT_PATIENTID,
       GENERATEDAT,
       S.BILL_BILLID,
       RESULT,
       COMNT,
       FIRST_NAME,
       LAST_NAME,
       CNIC,
       TESTNAME,
       SAMPLEVALUE,
       UNIT
FROM REPORT
         JOIN SAMPLE S on REPORT.SAMPLE_SAMPLEID = S.SAMPLEID
         JOIN SAMLERESLTS S2 on S.SAMPLEID = S2.SAMPLE_SAMPLEID
         JOIN PATIENT P on P.PATIENTID = REPORT.PATIENT_PATIENTID
         JOIN TEST T on T.TESTID = S.TEST_TESTID
         JOIN TESTDATA T2 on T.TESTID = T2.TEST_TESTID

WHERE REPORTID = :a
`,[reportid]
      );

    const data = resu.rows[0];
  
      await con.close();
 console.log(data)
    const htm = `
    <style>
    table, th, td {
      border: 1px solid black;

    }
    @media print {
      #printPageButton {
        display: none;
      }
    }
    </style>
    <div><button id="printPageButton" onClick="window.print()">Print Report
    </button></div>
    <h1>LIMS</h1>
    <h2>Report-ID # ${data[0]}</h2>
    <h2>Bill-ID # ${data[3]}</h2>
    <h3>Patient ID: ${data[1]}</h3>
    <h3>Patient Name: ${data[6]} ${data[7]} </h3>
    <h3>CNIC: ${data[8]} </h3>
    <br>
 
    <table width="100%">
    <tr>
      
      <th >Test Name</th>
      <th>Reference Value</th>
      <th>Unit</th>
      <th>Result</th>
    
    </tr>
    <tr>
 
    <td>${data[9]}</td>
    <td>${data[10]}</td>
    <td>${data[11]}</td>
    <td>${data[4]}</td> 
  </tr>
  </table>

 <h3>Generated at: ${data[2]} </h3>
 <br/>
 
    `
    

      res.status(200).send(htm)
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "Failed",
        message: error,
      });
    }
  });