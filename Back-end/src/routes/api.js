import express from "express"
import apiController from "../controllers/apiController"
import loginController from "../controllers/loginController"
import userController from '../controllers/userController'
import { checkUserJWT } from '../middleware/JWTServices'

const router = express.Router()



const initApiRoutes = (app) => {
    router.all('*', checkUserJWT);

    router.post('/login', loginController.handleLogin)
    router.get('/all-code', apiController.getAllCode);
    router.get('/users', apiController.getUsers);
    router.get('/type-role', apiController.getTypeRole)
    router.get('/account', userController.getAccount)
    router.post('/logout', userController.handleLogout)
    router.post('/create-user', userController.handleCreateUser)
    router.delete('/delete-user', userController.handleDeleteUser)

    router.get('/data-update-user', userController.handleGetDataUpdateUser)
    router.patch('/update-user', userController.handleUpdateUser)

    return app.use("/api/", router)

}

export default initApiRoutes