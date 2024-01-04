import express from "express"
import apiController from "../controllers/apiController"
import loginController from "../controllers/loginController"

const router = express.Router()



const initApiRoutes = (app) => {
    // router.all('*', checkUserJWT, checkUserPermission);

    router.post('/login', loginController.handleLogin)
    router.get('/all-code', apiController.getAllCode);


    return app.use("/api/", router)

}

export default initApiRoutes