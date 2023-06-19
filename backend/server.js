const express = require('express')
const app = express()
app.use(express.json())
const userRoutes = require('./routes/userRoute')
const companyRoute = require("./routes/companyRoutes")
const statementRoute = require("./routes/statement_route")
const port = 3005
const cors = require("cors")
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./uploads'));

userRoutes.usersRoutes(app)
companyRoute.companiesRoutes(app)
statementRoute.statementRoutes(app)


app.listen(port);
