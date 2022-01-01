const connection = require("../config/db");
const dbcon = require("../config/db");
const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const moment = require("moment");
const { hashpas } = require("../util/password");

// @desc  Register Employee
// @route POST /api/v1/auth/empreg
// @access Private (Role Based)

exports.register = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const {
      firstname,
      lastname,
      dob,
      mobile,
      telephone,
      address,
      cnic,
      status,
      username,
      password,
      role,
      email,
    } = req.body;
    const rqid = parseInt(role);
    console.log(firstname);
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const pw = await bcrypt.hash(password, salt);
    var currentDate = new Date();
    const dat = moment(dob).format('YYYY-MM-DD HH:mm:ss')

    const result = await con.execute(
      `INSERT INTO EMPLOYEE ( FIRST_NAME, LAST_NAME, DOB, MOBILENUMBER,
         TELEPHONE, ADDRESS, CNIC, STATUS,  USERNAME, PASSWORD, ROLES_ROLEID, EMAIL)
         VALUES
        (:fn , :ln , TO_DATE(:dob, 'YYYY-MM-DD HH24:MI:SS') ,
        :mob , :tel, :addr , :cnic , :sta ,  :username , :pass , :rl , :em
        )

         `,
      [
        firstname,
        lastname,
        dat,
        mobile,
        telephone,
        address,
        cnic,
       1,
        username,
        pw,
        rqid,
        email
      ],
      { autoCommit: true }
    );
    await con.close();

    res.status(200).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(406).json({
      status: "Failed",
      message: error,
    });
  }
});

// @desc  Register Employee
// @route POST /api/v1/auth/empreg
// @access Public

exports.login = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const { username, password } = req.body;

    const result = await con.execute(
      `SELECT EMPLOYEE_ID,USERNAME,PASSWORD, ROLES_ROLEID FROM EMPLOYEE WHERE USERNAME = :us`,
      [username]
    );

    if (
      result.rows.length == 1 &&
      bcrypt.compareSync(password, result.rows[0][2])
    ) {
      var jwttoken = jwt.sign(
        { id: result.rows[0][0], role: result.rows[0][3] },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      const opt = {
        expires: new Date(
          Date.now() + parseInt(process.env.JWT_EXPIRE) * 24 * 60 * 60 * 100
        ),
        httpOnly: true,
      };
      console.log(opt)
      res.status(200).cookie("token", jwttoken, opt).json({
        status: "success",
        token: jwttoken,
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Invalid Crd",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(406).json({
      status: "Failed",
      message: error,
    });
  }
});

exports.navbar = asyncHandler(async (req, res, next) => {
  try {
    
    let con = await oracledb.getConnection(connection());

    const tok = jwt.verify(req.headers['x-emp-ath'], process.env.JWT_SECRET);
    const rol = parseInt(tok.role);
console.log(rol)
    const result = await con.execute(
      `SELECT ROLEID, ROLEPERMISSIONS_ID, TITLE FROM  ROLES JOIN
      ROLES_ROLEPERMISSIONS RR on ROLES.ROLEID = RR.ROLES_ROLEID JOIN
      ROLEPERMISSIONS R on R.ID = RR.ROLEPERMISSIONS_ID
  WHERE ROLEID = 
  
   :id `,
      [rol]
    );
    var fr = [];

    await Promise.all(
      result.rows.map(async (ar) => {
        let sub = await con.execute(
          `SELECT TITLE,LINK FROM ROLESUBITEM WHERE ROLEPERMISSIONS_ID = :id `,
          [ar[1]]
        );
        ar.push(sub.rows);
        fr.push(ar);
      })
    );

    await res.status(200).send(fr);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "Failed",
      message: error,
    });
  }
});



  
   
exports.getroles = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   
    const resu = await con.execute(
      `SELECT * FROM ROLES`
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


exports.searchroles = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   const {value} = req.body;
    const resu = await con.execute(
      `SELECT * FROM ROLEPERMISSIONS JOIN ROLES_ROLEPERMISSIONS RR on ROLEPERMISSIONS.ID = RR.ROLEPERMISSIONS_ID
      WHERE ROLES_ROLEID = :a`,[value]
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





  
   
exports.deleteroles = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   const {value} = req.body;
   
   const roleid = parseInt(value)
   console.log(roleid)

    let resu = await con.execute(
      `delete 
      from ROLES_ROLEPERMISSIONS
      where ROLES_ROLEID = :a `,[roleid],{autoCommit: true}
    );
    console.log(resu)
     resu = await con.execute(
      `delete 
      from ROLES
      where ROLEID = :a `,[roleid],{autoCommit: true}
    );
    await con.close();
    res.status(200).json({
      success : true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});







  
   
exports.getroleper = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   
    const resu = await con.execute(
      `select *
      from ROLEPERMISSIONS;`
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

  
   
exports.getassignper = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   const {value} = req.body
   
    const resu = await con.execute(
      `SELECT * FROM  ROLEPERMISSIONS
      MINUS
      SELECT ID, TITLE FROM ROLEPERMISSIONS JOIN ROLES_ROLEPERMISSIONS RR on ROLEPERMISSIONS.ID = RR.ROLEPERMISSIONS_ID
      WHERE ROLES_ROLEID = :a
      `,[value]
    );
    
    const data = resu.rows;
    
    let rf = []
    data.map(a => {
        let x = {
           value: a[0],
           label: a[1] 
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





  
   
exports.addassignper = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   const {roles,per} = req.body
   const rid = parseInt(roles)
 
   const values = per.map(a => a['value'])
  
   await Promise.all(
 values.map(async (a)=>{

  let resu = await con.execute(
    `insert into ROLES_ROLEPERMISSIONS (ROLES_ROLEID, ROLEPERMISSIONS_ID)
    values (:a,:b)`,[rid,a],{autoCommit: true}
  );
 })
   )
    
    await con.close();
    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});

  



  
   
exports.deleteasp = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
   const {value , pid} = req.body;
   
   const roleid = parseInt(value)
   const perid = parseInt(pid)

    let resu = await con.execute(
      `delete 
      from ROLES_ROLEPERMISSIONS
      where ROLES_ROLEID = :a AND ROLEPERMISSIONS_ID = :b`,[roleid, perid],{autoCommit: true}
    );

   
    await con.close();
    res.status(200).json({
      success : true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});

