import express from "express"
import apiController from "../controllers/apiController"
import loginController from "../controllers/loginController"
import userController from '../controllers/userController'
import { checkUserJWT } from '../middleware/JWTServices'
import doctorController from '../controllers/doctorController'
import postController from '../controllers/postController'
import uploadCloud from '../config/cloudinary.config'

const router = express.Router()



const initApiRoutes = (app) => {
    // router.all('*', checkUserJWT);

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

    // manage doctors route

    // + router get data select
    router.get('/get-doctors', doctorController.getAllDoctor)
    router.get('/get-prices', doctorController.getAllPrice)
    router.get('/get-payments', doctorController.getAllPayments)
    router.get('/get-provinces', doctorController.getAllProvinces)
    router.get('/get-specialties', doctorController.getAllSpecialties)
    router.get('/get-clinics', doctorController.getAllClinics)

    router.get('/get-info-doctor', doctorController.getInfoDoctor)
    router.post('/update-info-doctor', doctorController.updateInfoDoctor)

    // Detail doctor
    router.get('/get-info-detail-doctor', doctorController.getDetailDoctor)
    router.get('/get-schedule-by-date', doctorController.getScheduleByDate)

    // Manage schedule
    router.get('/get-all-schedule', doctorController.getAllSchedule)
    router.post('/create-schedule', doctorController.createSchedule)

    // Image upload post
    router.post('/upload-image', uploadCloud.single('image'), postController.uploadImage)

    // manage posts route
    router.get('/get-posts', postController.getAllPost)
    router.get('/get-post', postController.getPostWithId)
    router.post('/create-post', postController.handleCreatePost)
    router.delete('/delete-post', postController.handleDeletePost)
    router.put('/update-post', postController.handleUpdatePost)

    return app.use("/api/", router)

}

export default initApiRoutes