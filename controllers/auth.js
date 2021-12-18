const connection = require("../config/db");
const dbcon = require("../config/db");
const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
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
    console.log(rqid);
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const pw = await bcrypt.hash(password, salt);

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
        dob,
        mobile,
        telephone,
        address,
        cnic,
        status,
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

    const tok = jwt.verify(req.cookies['token'], process.env.JWT_SECRET);
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
