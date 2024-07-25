const JWT = require("jsonwebtoken");

const genToken = async(payload )=>{
const Token  = await JWT.sign(payload, process.env.SUCRET_KEY , {expiresIn:"1m"});
return Token;
}

module.exports = genToken;