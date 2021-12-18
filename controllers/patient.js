const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const connection = require("../config/db");
var jwt = require("jsonwebtoken");

exports.patient = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const { cnic } = req.body;
    
    console.log(cnic);
    const result = await con.execute(
      `SELECT PATIENTID
FROM PATIENT
WHERE CNIC = :cn`,
      [cnic]
    );
    await con.close()

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});

exports.addpatient = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const { firstName, lastName, dob, contact, cnic, gender, email } = req.body;
   const resu =  await con.execute(
      `INSERT INTO NEWLIMS.PATIENT ( FIRST_NAME, LAST_NAME, DOB, CNIC, CONTACTNUMBER, CREATEDAT, EMAIL, GENDER) VALUES (:a,:b,TO_DATE(:c, 'YYYY-MM-DD HH24:MI:SS'),:d,:e,TO_DATE(:f, 'YYYY-MM-DD HH24:MI:SS'),:g,:h)`,
      [firstName,lastName,dob,cnic, contact, '2021-12-05 14:55:46',email,gender ],
      { autoCommit: true }
    );
    await con.close()
    res.send(resu);
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});


exports.patientdetails = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const { cnic } = req.body;
    
    console.log(cnic)
    const result = await con.execute(
      `SELECT *
FROM PATIENT
WHERE CNIC = :cn`,
      [cnic]
    );
    
    await con.close()

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});

