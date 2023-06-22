const companyController = require("../controllers/company_controller")
const upload = require("../midlleware/upload")

function companiesRoutes(app){

    app.get("/all_companies",companyController.getAll)

    app.post("/register_company",upload.single("image"),companyController.register_company)

    app.post("/login_company",companyController.login_company)

    app.post("/update_company/:id",companyController.updateCompany)

    app.post("/addPhoto/:id",upload.single("profilePhoto"),companyController.addCompanyProfile)

    app.delete('/delete_company/:id',companyController.deleteCompany)
}

module.exports = {companiesRoutes}