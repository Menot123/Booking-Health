import express from 'express';
import homeController from '../controllers/homeController'
import testController from '../controllers/testControllers'
import loginController from '../controllers/loginController'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.homePage);
    router.get('/test-create', testController.testCreate)

    router.post('/login', loginController.login)
    return app.use('/', router)
}

module.exports = initWebRoutes