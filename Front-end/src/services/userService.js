import axios from "../axios/axios";


const fetchAllUser = (page, limit) => {
    return axios.get(`/api/users?page=${page}&limit=${limit}`)
}

const fetchAllDataSelect = (type) => {
    return axios.get(`/api/type-role?type=${type}`)
}

const login = (username, password) => {
    return axios.post('/api/login', { username, password })
}

const getUserAccount = () => {
    return axios.get('/api/account')
}

const createNewUser = (data) => {
    return axios.post('/api/create-user', { data })
}

const deleteUser = (user) => {
    return axios.delete('/api/delete-user', { data: { user: user } })
}

const getDataUpdateUser = (data) => {
    return axios.get(`/api/data-update-user?userId=${data.userId}&userEmail=${data.userEmail}`)
}

const updateUserData = (data) => {
    return axios.patch('/api/update-user', { data })
}

const getAllDoctor = () => {
    return axios.get('/api/get-doctors')
}

const getAllPrice = () => {
    return axios.get('/api/get-prices')
}

const getAllPayment = () => {
    return axios.get('/api/get-payments')
}

const getAllProvince = () => {
    return axios.get('/api/get-provinces')
}

const getAllSpecialties = () => {
    return axios.get('/api/get-specialties')
}

const getAllClinic = () => {
    return axios.get('/api/get-clinics')
}

const getInfoDoctor = (id) => {
    return axios.get(`/api/get-info-doctor?id=${id}`)
}

const updateInfoDoctor = (dataInfo) => {
    return axios.post(`/api/update-info-doctor`, { data: dataInfo })
}

const getInfoDetailDoctor = (doctorId) => {
    return axios.get(`/api/get-info-detail-doctor?id=${doctorId}`)
}

const getAllSchedule = () => {
    return axios.get('/api/get-all-schedule')
}

const createSchedule = (dataSchedule) => {
    return axios.post('/api/create-schedule', { data: dataSchedule })
}

const getSchedulesByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`)
}

const getDataProfileDoctor = (doctorId) => {
    return axios.get(`/api/get-info-profile-doctor?doctorId=${doctorId}`)

}

const createBookingDoctor = (dataSend) => {
    return axios.post(`/api/create-user-patient`, dataSend)
}

const verifyBooking = (dataSend) => {
    return axios.post(`/api/verify-booking-schedule`, dataSend)
}

export {
    fetchAllUser, fetchAllDataSelect, login, getUserAccount, createNewUser, deleteUser, getDataUpdateUser,
    updateUserData, getAllDoctor, getInfoDoctor, getAllPrice, getAllPayment, getAllProvince, getAllSpecialties,
    getAllClinic, updateInfoDoctor, getInfoDetailDoctor, getAllSchedule, createSchedule, getSchedulesByDate,
    getDataProfileDoctor, createBookingDoctor, verifyBooking
}