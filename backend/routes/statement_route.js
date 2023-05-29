const statment_controller = require('../controllers/statement_controller')
const upload = require("../midlleware/upload")
function statementRoutes(app){

    app.get("/all_statement",statment_controller.getAllStatement)

    app.post("/create_statement",upload.single("photo"),statment_controller.create_statement)
    
    app.put("/update_statement/:id",statment_controller.update_statement)

}

module.exports = {statementRoutes}