const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const connection = require("../config/db");
var jwt = require("jsonwebtoken");
const moment = require("moment");
const Patient = require("../model/Patient");
exports.patient = asyncHandler(async (req, res, next) => {
  try {
    
    const { cnic } = req.body;
    const result = await Patient.findOne({
      cnic : cnic
    }).select('_id')   


    res.status(200).json([[result['_id'].toString()]]);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});

exports.addpatient = asyncHandler(async (req, res, next) => {
  try {
   
    const { firstName, lastName, dob, contact, cnic, gender, email } = req.body;

    const resu = await Patient.create(req.body)
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
   
    const { firstName, lastName, dob, contact, pid, gender, email } = req.body;
    const dtb = moment(dob).format('YYYY-MM-DD');
const resu = await Patient.findByIdAndUpdate(pid,{
  
  firstName  : firstName,
   lastName : lastName,
    dob: dtb,
     contact : contact,     
       gender: gender,
        email: email
})
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
  
    const { cnic } = req.body;
    const resu = await Patient.findOne({
      cnic: cnic
    })
   
   console.log(resu)
 
    var fr = [
[
  resu['_id'].toString(), resu['firstName'], resu['lastName'], resu['dob'], resu['cnic'], resu['contact'],
  resu['gender'], resu['email']
]
    ]
   

//     const result = await con.execute(
//       `SELECT *
// FROM PATIENT
// WHERE CNIC = :cn`,
//       [cnic]
//     );
    
   

    res.status(200).json(fr);
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
    const resu = await Patient.find({}).select('_id firstName lastNAme cnic contact email gender')
   
    var fr = []
resu.map((e) =>{
  
let x = []
x.push(e['_id'].toString())
x.push(e['firstName'])
x.push(e['lastName'])
x.push(e['cnic'])
x.push(e['contact'])
x.push(e['email'])
x.push(e['gender'])

fr.push(x)
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






