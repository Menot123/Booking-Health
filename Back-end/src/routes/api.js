import express from "express"
import apiController from "../controllers/apiController"
import loginController from "../controllers/loginController"
import userController from '../controllers/userController'
import { checkUserJWT } from '../middleware/JWTServices'
import doctorController from '../controllers/doctorController'
import postController from '../controllers/postController'
import patientController from '../controllers/patientController'
import uploadCloud from '../config/cloudinary.config'
import specialty from '../controllers/specialtyController'
import clinic from '../controllers/ClinicController'

const router = express.Router()



const initApiRoutes = (app) => {

    router.get('/get-doctors', doctorController.getAllDoctor)
    // Detail doctor
    router.get('/get-info-doctor', doctorController.getInfoDoctor)
    router.get('/get-schedule-by-date', doctorController.getScheduleByDate)
    router.get('/get-info-detail-doctor', doctorController.getDetailDoctor)

    // Get data to Modal booking
    router.get('/get-info-profile-doctor', doctorController.getInfoProfile)
    // Create user when booking
    router.post('/create-user-patient', patientController.createUser)

    router.get('/type-role', apiController.getTypeRole)
    router.post('/verify-booking-schedule', patientController.verifyBookingSchedule)

    // Manage specialty
    router.get('/get-specialties', specialty.getSpecialties)
    router.get('/get-detail-specialty', specialty.getDetailSpecialty)

    // Manage clinic
    router.get('/get-clinics', clinic.getClinics)
    router.get('/get-detail-clinic', clinic.getDetailClinic)

    // Get doctor by specialty and location
    router.get('/get-doctors-specialty-location', specialty.getDoctorSpecialtyLocation)



    router.all('*', checkUserJWT);

    router.post('/login', loginController.handleLogin)
    router.get('/all-code', apiController.getAllCode);
    router.get('/users', apiController.getUsers);
    router.get('/account', userController.getAccount)
    router.post('/logout', userController.handleLogout)
    router.post('/create-user', userController.handleCreateUser)
    router.delete('/delete-user', userController.handleDeleteUser)

    router.get('/data-update-user', userController.handleGetDataUpdateUser)
    router.patch('/update-user', userController.handleUpdateUser)

    // manage doctors route

    // + router get data select
    router.get('/get-prices', doctorController.getAllPrice)
    router.get('/get-payments', doctorController.getAllPayments)
    router.get('/get-provinces', doctorController.getAllProvinces)
    router.get('/get-specialties', doctorController.getAllSpecialties)
    router.get('/get-clinics', doctorController.getAllClinics)

    router.post('/update-info-doctor', doctorController.updateInfoDoctor)

    // Manage schedule
    router.get('/get-all-schedule', doctorController.getAllSchedule)
    router.post('/create-schedule', doctorController.createSchedule)

    // Image upload post
    router.post('/upload-image', uploadCloud.single('image'), postController.uploadImage)

    // manage posts route
    router.get('/get-posts', postController.getAllPost)
    router.get('/get-post', postController.getPostWithId)
    router.get('/get-posts-by-type', postController.getPostsWithType)
    router.post('/create-post', postController.handleCreatePost)
    router.delete('/delete-post', postController.handleDeletePost)
    router.put('/update-post', postController.handleUpdatePost)

    // Manage specialty
    router.post('/create-specialty', specialty.createSpecialty)
    router.post('/post-data-update-specialty', specialty.updateSpecialty)
    router.post('/delete-specialty', specialty.deleteSpecialty)

    // Manage clinic
    router.post('/create-clinic', clinic.createClinic)
    router.post('/delete-clinic', clinic.deleteClinic)
    router.post('/post-data-update-clinic', clinic.updateClinic)


    return app.use("/api/", router)

}

export default initApiRoutes