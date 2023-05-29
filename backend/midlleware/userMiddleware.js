const jwt = require("jsonwebtoken")
const secret = process.env.TOKEN_SECRET
require("dotenv").config()

exports.authenticateTokenUser = ( req, res, next ) => {
    const token = req.headers.authorization

    if(token == null) return res.sendStatus(401)

    jwt.verify(token,secret, (err,user) => {
        if(err){
            return res.sendStatus(403)
        }
        if(user.role = "user"){
            next()
        }
    })
}