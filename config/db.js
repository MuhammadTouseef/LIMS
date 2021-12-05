const oracledb = require("oracledb");

const connection = ()=> {
  return({
    user: process.env.dbusername,
    password: process.env.dbpassword,
    connectString: process.env.connectionstring,
  })
}
/*
const dbcon = async (query) => {
 
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
*/
module.exports = connection;
