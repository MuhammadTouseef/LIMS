const asyncHandler = require("../middlewear/async");
const oracledb = require("oracledb");
const connection = require("../config/db");
var jwt = require("jsonwebtoken");

exports.patient = asyncHandler(async (req, res, next) => {
  try {
    let con = await oracledb.getConnection(connection());
    const { cnic } = req.body;
    console.log(cnic)
    const result = await con.execute(
      `SELECT COUNT(CNIC)
FROM PATIENT
WHERE CNIC = :cn`,
      [cnic]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
});
