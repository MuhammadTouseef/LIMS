const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const connection = require("../config/db");
var jwt = require("jsonwebtoken");
const { SODA_COLL_MAP_MODE } = require("oracledb");
var uniqid = require("uniqid");
var generator = require("generate-password");
const moment = require("moment");
var easyinvoice = require("easyinvoice");
const base64 = require("base64topdf");
const Test = require("../model/Test");
const Roles = require("../model/Roles");
const Patient = require("../model/Patient");
const Bill = require("../model/Bill");
exports.addtest = asyncHandler(async (req, res, next) => {
  try {
    const { testname, sample, time, cost } = req.body;
    const tm = parseInt(time);
    const cs = parseInt(cost);
    const resu = await Test.create(req.body);

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
    console.log(testid);

    const resu = await Test.findByIdAndUpdate(testid, {
      testname: testname,
      sample: sample,
      time: tm,
      cost: cs,
    });
    //     const resu = await con.execute(
    //       `
    // UPDATE TEST SET TESTNAME = :a,
    // SAMPLEREQUIRE = :b,
    // REPORTINGDAYS = :c,
    // COST = :d
    // WHERE TESTID = :d
    // `,
    //       [testname, sample, tm, cs, testid],
    //       { autoCommit: true }
    //     );
    //     await con.close();
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
    // let con = await oracledb.getConnection(connection());

    // const resu = await con.execute(
    //   `SELECT TESTNAME,TESTID FROM TEST`
    // );
    // await con.close();
    const resu = await Test.find({}).select("_id testname");
    var fr = [];
    resu.map((e) => {
      let x = [];
      x.push(e["testname"]);
      x.push(e["_id"]);

      fr.push(x);
    });
    res.status(200).json(fr);
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
    // let con = await oracledb.getConnection(connection());

    // const resu = await con.execute(
    //   `SELECT * FROM TEST`
    // );
    // await con.close();
    const resu = await Test.find({});
    var fr = [];
    resu.map((e) => {
      let x = [];
      x.push(e["testname"]);
      x.push(e["sample"]);
      x.push(e["time"]);
      x.push(e["cost"]);
      x.push(e["_id"]);

      fr.push(x);
    });
    res.status(200).json(fr);
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
    const { value } = req.body;
    //  const val = `%${value}%`
    //   const resu = await con.execute(
    //     `SELECT * FROM TEST WHERE TESTNAME LIKE :a `
    //   ,[val]);
    //   await con.close();
    const resu = await Test.find({
      testname: value,
    });
    console.log(resu)
    var fr = [];
resu.map((e)=>{
  let x = [];
  x.push(e["testname"]);
  x.push(e["sample"]);
  x.push(e["time"]);
  x.push(e["cost"]);
  x.push(e["_id"]);

  fr.push(x);
})
  
 
    res.status(200).json(fr);
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
    const { test, sample, desc, unit, pt } = req.body;
    console.log(req.body);
    const dt = {
      name: test,
      value: sample,
      desc: desc,
      unit: unit,
    };
    const resu = await Test.findByIdAndUpdate(pt, {
      $addToSet: { testdata: dt },
    });

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
    const { role } = req.body;
    // const rid = Math.floor(Math.random() * 9999999);
    // const resu = await con.execute(
    //   `insert into NEWLIMS.ROLES (ROLEID, NAME)
    //     values (:a,:b)`,
    //   [rid, role],
    //   { autoCommit: true }
    // );
    // await con.close();
    const resu = await Roles.create({
      title: role
    })
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
    const { title } = req.body;

    const resu = await con.execute(
      `insert into ROLEPERMISSIONS (TITLE)
        values (:a)`,
      [title],
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

    // const resu = await con.execute(`SELECT TESTNAME,TESTID FROM TEST`);
    // const data = resu.rows;
    const resu = await Test.find({});

    let rf = [];
    resu.map((a) => {
      let x = {
        value: a['_id'].toString(),
        label: a['testname'],
      };
      rf.push(x);
    });
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

    const { tests, pid } = req.body;
    const patid = pid;
    const values = tests.map((a) => a["value"]);
    var totalcost = 0;
var testids = []
    await Promise.all(
      values.map(async (one) => {        

        let resu = await Test.findById(one, 'cost  _id')
        totalcost += parseInt(resu['cost']);
        testids.push(resu['_id'].toString())
      })
    );
 
    const tax = parseInt(totalcost * 0.17);
    const grandtotal = totalcost + tax;
    console.log(grandtotal);
    var password = generator.generate({
      length: 12,
      numbers: true,
      strict: true,
    });

    const tok = jwt.verify(req.headers["x-emp-ath"], process.env.JWT_SECRET);
    const eid = parseInt(tok.id);


//     let resu = await con.execute(
//       `insert into BILL ( COST, TAXES, TOTAL, EMPLOYEE_EMPLOYEE_ID, PATIENT_PATIENTID, PASSWORD)
// values (:a,:b,:c,:d,:e,:f) `,
//       [totalcost, tax, grandtotal, eid, patid, password],
//       { autoCommit: true }
//     );
// const rid = uniqid();


    let resu = await Bill.create({
      patientid : patid,
      Tests: testids,
   
      cost: totalcost,
      tax: tax,
      grandTotal: grandtotal,
      password: password
    })



    // let billid = await con.execute(`SELECT max(BILLID) FROM BILL `);
    // billid = parseInt(billid.rows[0][0]);
    // await Promise.all(
    //   values.map(async (one) => {
    //     let resu = await con.execute(
    //       `insert into BILL_TEST (BILL_BILLID, TEST_TESTID)
    //       values (:a,:b)
    //       `,
    //       [billid, one],
    //       { autoCommit: true }
    //     );
    //   })
    // );

    // await con.close();
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
    const { status, patientid, billid, testid } = req.body;
    const tok = jwt.verify(req.headers["x-emp-ath"], process.env.JWT_SECRET);
    const empid = parseInt(tok.id);
    var currentDate = new Date();
    const takenat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");

//     const resu = await con.execute(
//       `insert into NEWLIMS.SAMPLE ( TAKENAT, STATUS, EMPLOYEE_EMPLOYEE_ID, BILL_BILLID,
//           TEST_TESTID)
// values (TO_DATE(:a, 'YYYY-MM-DD HH24:MI:SS'),:b,:d,:e,:f)`,
//       [takenat, status, empid, billid, testid],
//       { autoCommit: true }
//     );
const rid = uniqid();
let resu = await Bill.findById(billid)
resu.samples.push({
  sid: rid,
  takenat: takenat,
  status: status,
})

resu.save()
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
    const { result, comment, sampleid } = req.body;
    const tok = jwt.verify(req.headers["x-emp-ath"], process.env.JWT_SECRET);
    const empid = parseInt(tok.id);
    var currentDate = new Date();
    const takenat = moment(currentDate).format("YYYY-MM-DD HH:mm:ss");
    let resu = await Bill.findOne(
      {
        "samples.sid": sampleid
      }
    )
    resu.results.push({
      "takenat": takenat,
      result: result,
      "sample": sampleid
    })
    resu.save();

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

const resu = await Bill.find().populate('patientid').select()
var resa = [];
let tem = [];

resu.map((e)=>{
  
  e['samples'].map((a)=>{
    tem = [];
tem.push(a['sid'])
tem.push(a['takenat'])
tem.push(a['status'])
tem.push(e['_id'])
tem.push(e['patientid'].firstName )
tem.push(e['patientid'].lastName )
tem.push(e['patientid']._id )
resa.push(tem)
  })
})



    res.status(200).json(resa);
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
    const resu = await Bill.find().populate('patientid').select()
var resa = [];
let tem = [];

resu.map((e)=>{
tem = []
tem.push(e['_id'])
tem.push(e['patientid']._id )
tem.push(e['patientid'].firstName )
tem.push(e['patientid'].lastName )
tem.push(e['password'])
tem.push(e['cost'])
tem.push(e['tax'])
tem.push(e['grandtotal'])
resa.push(tem)

})
  res.status(200).json(resa);
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
    let { value } = req.body;

    const resu = await con.execute(
      `SELECT BILLID, PATIENTID, FIRST_NAME,  LAST_NAME , PASSWORD, COST, TAXES, TOTAL FROM BILL JOIN
        PATIENT P on P.PATIENTID = BILL.PATIENT_PATIENTID
        WHERE BILLID = :a
    ORDER BY BILLID DESC `,
      [value]
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
    const resu = await Bill.find({
      "_id": billid
    }).populate('Tests')
    console.log(resu)
    console.log("***********")
    var resa = [];
    let tem = [];
    let tem2 = [];
    var billdetails = [];
    let initr;
    await Promise.all(
    resu.map((e)=>{
    tem = []
    tem.push(e['_id'])
    tem.push(e['patientid']._id )
    tem.push(e['patientid'].firstName )
    tem.push(e['patientid'].lastName )
    tem.push(e['password'])
    tem.push(e['cost'])
    tem.push(e['tax'])
    tem.push(e['grandTotal'])
 
e['Tests'].map( async (a)=>{
  tem2 = [];

  initr = await Test.findById(a)
 tem2.push(initr['_id'])
 tem2.push(initr['testname'])
 tem2.push(initr['cost'])

 billdetails.push(tem2)

})
    resa.push(tem)
    
    })
    )
   console.log(resa)
   console.log(billdetails)

    let tabl = "";

    billdetails.map((e) => {
      let x = ` 

       <tr>
       <td>${e[0]}</td>
       <td>${e[1]}</td>
       <td>Rs ${e[2]}</td>
       </tr>
       `;
      tabl += x;
    });
    let tablep = `
 
     <table>
  <tr>
    <th>Test ID</th>
    <th>Test Name</th>
    <th>Cost</th>
  </tr>
  ${tabl}
</table>
     `;
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
 
    `;

    res.status(200).send(htm);
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
`,
      [reportid]
    );

    const data = resu.rows[0];

    await con.close();
    console.log(data);
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
 
    `;

    res.status(200).send(htm);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});
