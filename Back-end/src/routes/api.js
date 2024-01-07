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

    return app.use("/api/", router)

}

export default initApiRoutes