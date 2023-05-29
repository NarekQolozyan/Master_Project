const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.TOKEN_SECRET
require('dotenv').config()

function generateAccessToken(firstName,role){

    return jwt.sign({ firstName,role }, JWT_SECRET , { expiresIn: "36000s" });
    
} 

module.exports = { generateAccessToken }