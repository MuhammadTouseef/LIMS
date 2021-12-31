const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const connection = require("../config/db");
var jwt = require("jsonwebtoken");
const moment = require("moment");
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


exports.editpatient = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const { firstName, lastName, dob, contact, pid, gender, email } = req.body;
    const dtb = moment(dob).format('YYYY-MM-DD');
console.log(dtb)
   const resu =  await con.execute(
      `UPDATE NEWLIMS.PATIENT
      set FIRST_NAME  = :a,
          LAST_NAME = :b,
          DOB = TO_DATE(:c, 'YYYY-MM-DD'),
          CONTACTNUMBER = :d,
          EMAIL = :e,
          GENDER = :f
      where PATIENTID = :g`,
      [firstName,lastName,dtb, contact ,email,gender,pid ],
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

exports.getallpatient = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    console.log("OK")

    const resu = await con.execute(
      `SELECT PATIENTID, FIRST_NAME, LAST_NAME, CNIC, CONTACTNUMBER , EMAIL, GENDER
      FROM PATIENT 
      
      ORDER BY PATIENTID DESC`
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



exports.searchp = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   
const {tp,value} = req.body;
var resu;
if (tp === 'NAME'){
   resu = await con.execute(
    `SELECT PATIENTID, FIRST_NAME, LAST_NAME, CNIC, CONTACTNUMBER , EMAIL, GENDER
    FROM PATIENT
    WHERE
    REGEXP_LIKE(FIRST_NAME || LAST_NAME , :a)

    ORDER BY PATIENTID DESC`,[value]
  );
  await con.close();
}else if (tp == 'CNIC'){

  resu = await con.execute(
    `SELECT PATIENTID, FIRST_NAME, LAST_NAME, CNIC, CONTACTNUMBER , EMAIL, GENDER
    FROM PATIENT
    WHERE CNIC = :y
    ORDER BY PATIENTID DESC`,[value]
  );
  await con.close();
           
  if(resu.rows.length >=1){
    res.status(200).json(resu.rows);
   }else{
    res.status(404).json({
      status: "Not Found",
     
    });
   }
 
}
else{
  
  resu = await con.execute(
    `SELECT PATIENTID, FIRST_NAME, LAST_NAME, CNIC, CONTACTNUMBER , EMAIL, GENDER
    FROM PATIENT
    WHERE PATIENTID = :y
    ORDER BY PATIENTID DESC`,[value]
  );
  await con.close();
           
  if(resu.rows.length >=1){
    res.status(200).json(resu.rows);
   }else{
    res.status(404).json({
      status: "Not Found",
     
    });
   }
}


  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});






