const statement_controller = require('../controllers/statement_controller')
const upload = require("../midlleware/upload")
function statementRoutes(app){

    app.get("/all_statement",statement_controller.getAllStatement)

    app.get('/getById/:id',statement_controller.getById)

    app.post("/create_statement",upload.single("photo"),statement_controller.create_statement)
    
    app.put("/update_statement/:id",statement_controller.update_statement)

    app.delete('/delete_statement/:id', statement_controller.delete_statement)

}

module.exports = {statementRoutes}