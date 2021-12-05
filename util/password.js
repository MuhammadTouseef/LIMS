const bcrypt = require("bcryptjs");
exports.hashpas = async (password) =>{
const salt = await bcrypt.genSalt(10);
const pw = await bcrypt.hash(password,salt)
console.log(pw)
return pw;

}