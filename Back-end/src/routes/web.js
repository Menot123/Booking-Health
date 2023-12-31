import express from 'express';
import homeController from '../controllers/homeController'
import loginController from '../controllers/loginController'
import userController from '../controllers/userController'
let router = express.Router();

let initWebRoutes = (app) => {

    router.get('/all-code', userController.getAllCode);
    router.post('/login', loginController.login)

    router.get('/', homeController.homePage);
    return app.use('/', router)
}

module.exports = initWebRoutes