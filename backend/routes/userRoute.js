const userController = require('../controllers/user_controllers')
function usersRoutes(app){

    app.get("/all",userController.getAll)

    app.post("/register",userController.register_user)

    app.post("/login",userController.login_user)
    
    app.post("/updateUser/:id",userController.updateUser)

    app.post("/addProfilePhotho",userController.addUserProfile)
}

module.exports = { usersRoutes }