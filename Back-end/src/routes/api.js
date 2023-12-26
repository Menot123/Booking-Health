import express from "express"
import apiController from "../controllers/apiController"

const router = express.Router()



const initApiRoutes = (app) => {
    // router.all('*', checkUserJWT, checkUserPermission);

    router.post('/login', apiController.handleLogin)

    return app.use("/api/v1/", router)

}

export default initApiRoutes