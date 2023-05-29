const companyController = require("../controllers/company_controller")

function companiesRoutes(app){

    app.get("/all_company",companyController.getAll)

    app.post("/register_company",companyController.register_company)

    app.post("/login_company",companyController.login_company)
}

module.exports = {companiesRoutes}