import React from 'react'
import './ManagePatients.scss'
import { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import { LANGUAGES } from '../../../utils/index'
import { useSelector } from 'react-redux';
import moment from 'moment'
import _ from 'lodash';
import { getAllPatientsByDate, confirmAndSendRemedy } from '../../../services/userService'
import ModalRemedy from './ModalRemedy'
registerLocale('vi', vi)

function ManagePatients() {
    const language = useSelector(state => state.userRedux.language)
    const idDoctor = useSelector(state => state.userRedux.id)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [dateSelected, setDateSelected] = useState(moment(new Date()).format('DD/MM/YYYY'))
    const [patients, setPatients] = useState([])
    const [isOpenModalRemedy, setIsOpenModalRemedy] = useState(false)
    const dataPatientDefault = {
        email: '',
        idPatient: '',
        timeType: '',
        fullName: '',
    }
    const [dataPatient, setDataPatient] = useState(dataPatientDefault)
    const [isSendingEmail, setIsSendingEmail] = useState(false)

    const handleChangeDatePicker = (date) => {
        setCurrentDate(date)
        setDateSelected(moment(date).format('DD/MM/YYYY'))
    }

    const fetchPatientsByDate = async () => {
        let res = await getAllPatientsByDate({ idDoctor, dateSelected })
        if (res.EC === 0) {
            setPatients(res.DT)
        } else {
            toast.error(res.EM)
        }
    }

    useEffect(() => {
        fetchPatientsByDate()
    }, [dateSelected])


    const handleSendRemedy = (patient) => {
        setIsOpenModalRemedy(true)
        setDataPatient({
            email: patient?.dataPatient?.email,
            idPatient: patient?.patientId,
            timeType: patient?.timeType,
            fullName: patient?.dataPatient?.firstName
        })
    }


    const handleCloseModalRemedy = () => {
        setIsOpenModalRemedy(false)
    }

    const sendRemedy = async (email, remedy) => {
        setIsSendingEmail(true)
        let dataSend = {
            email: email,
            remedy: remedy,
            doctorId: idDoctor,
            timeType: dataPatient.timeType,
            patientId: dataPatient.idPatient,
            language: language,
            fullName: dataPatient.fullName
        }

        let res = await confirmAndSendRemedy(dataSend)
        if (res.EC === 0) {
            setIsSendingEmail(false)
            toast.success(res.EM)
            setDataPatient(dataPatientDefault)
            fetchPatientsByDate()
            handleCloseModalRemedy()
        } else {
            setIsSendingEmail(false)
            toast.error(res.EM)
        }
    }

    return (
        <>
            <h3 className='text-center mt-3'><FormattedMessage id="doctor-manage-patients.title" /></h3>
            <div className='manage-patient-container container'>
                <div className='select-date'>
                    <DatePicker className='form-select select-date-picker w-100'
                        selected={currentDate}
                        onChange={(date) => handleChangeDatePicker(date)}
                        minDate={new Date()}
                        locale={language === LANGUAGES.VI ? "vi" : 'en'}
                        placeholderText={language === LANGUAGES.VI ? "Chọn ngày" : "Select date"}
                    />
                </div>
                <div className='table-patient mt-4'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"><FormattedMessage id="doctor-manage-patients.stt" /></th>
                                <th scope="col"><FormattedMessage id="doctor-manage-patients.time-table" /></th>
                                <th scope="col"><FormattedMessage id="doctor-manage-patients.name" /></th>
                                <th scope="col"><FormattedMessage id="doctor-manage-patients.address" /></th>
                                <th scope="col"><FormattedMessage id="doctor-manage-patients.gender" /></th>
                                <th scope="col"><FormattedMessage id="doctor-manage-patients.actions" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients && patients.length > 0
                                ? patients.map((item, index) => {
                                    return (
                                        <tr key={'patient' + index}>
                                            <th >{index + 1}</th>
                                            <td>{language === LANGUAGES.VI ? item?.dataTime?.valueVi : item?.dataTime?.valueEn}</td>
                                            <td>{item?.dataPatient?.firstName}</td>
                                            <td>{item?.dataPatient?.address}</td>
                                            <td>{language === LANGUAGES.VI ? item?.dataPatient?.genderData?.valueVi : item?.dataPatient?.genderData?.valueEn}</td>
                                            <td>
                                                <button className='btn btn-warning' onClick={() => handleSendRemedy(item)}><FormattedMessage id="doctor-manage-patients.btn-confirm" /></button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={6} className='text-center'>{language === LANGUAGES.VI ? 'Không có dữ liệu' : 'No data'}</td>
                                </tr>
                            }



                        </tbody>
                    </table>
                </div>
                <ModalRemedy
                    isOpenModal={isOpenModalRemedy}
                    handleCloseModal={handleCloseModalRemedy}
                    emailPatient={dataPatient?.email}
                    sendRemedy={sendRemedy}
                    isSendingEmail={isSendingEmail}
                />

            </div>
        </>
    )
}

export default ManagePatients