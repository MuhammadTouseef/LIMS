const oracledb = require("oracledb");

const dbcon = async (query) => {
  console.log(process.env.connectionstring);
  try {
    connection = await oracledb.getConnection({
      user: process.env.dbusername,
      password: process.env.dbpassword,
      connectString: process.env.connectionstring,
    });

    console.log("connected to database");
    result = await connection.execute(query);
    await connection.close();
    console.log("Closed Successfully");
    return result;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = dbcon;
