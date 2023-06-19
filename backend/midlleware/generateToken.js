const jwt = require("jsonwebtoken")
require('dotenv').config()
const JWT_SECRET = process.env.TOKEN_SECRET

function generateAccessToken(firstName,role){

    return jwt.sign({ firstName,role }, JWT_SECRET , { expiresIn: "36000s" });
    
} 

module.exports = { generateAccessToken }