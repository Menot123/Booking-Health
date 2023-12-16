import express from 'express';
import homeController from '../controllers/homeController'
import testController from '../controllers/testControllers'
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.homePage);
    router.get('/test-create', testController.testCreate)
    return app.use('/', router)
}

module.exports = initWebRoutes