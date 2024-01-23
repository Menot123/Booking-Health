import React from 'react'
import './ManageSchedules.scss'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { getAllDoctor, getAllSchedule, createSchedule } from '../../../services/userService'
import { toast } from 'react-toastify'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import { LANGUAGES } from '../../../utils/index'
import { useSelector } from 'react-redux';
import moment from 'moment'
import _ from 'lodash';


function ManageSchedules() {
    const language = useSelector(state => state.userRedux.language)


    registerLocale('vi', vi)

    const [doctors, setDoctors] = useState([])
    const [schedules, setSchedules] = useState([])
    const [doctorSelect, setDoctorSelect] = useState(null)
    const [selectedDoctor, setSelectedDoctor] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        Promise.all([getListDoctor(), getAllScheduleDoctor()])
    }, [])


    const getListDoctor = async () => {
        let res = await getAllDoctor()
        if (res.EC === 0 && res.DT.length > 0) {
            setDoctors(buildDataSelectDoctor(res.DT))
        } else {
            toast.error(res.EM)
        }
    }

    const getAllScheduleDoctor = async () => {
        let res = await getAllSchedule()
        if (res.EC === 0 && res.DT.length > 0) {
            res.DT.map((item, index) => {
                item.selected = false;
                return item
            })
            setSchedules(res.DT)
        } else {
            toast.error(res.EM)
        }

    }

    const handleSelectDoctor = (e) => {
        setSelectedDoctor(e.value)
        buildSetDataSelect(e.value)
    }

    const buildSetDataSelect = (data) => {
        doctors.forEach(item => {
            if (item.value === data) {
                setDoctorSelect(item)
            }
        })
    }

    const buildDataSelectDoctor = (data) => {

        let arrDoctor = []
        data.forEach((item) => {
            let doctorDataBuild = {
                value: item.id,
                label: item.lastName + ' ' + item.firstName
            }
            arrDoctor.push(doctorDataBuild)
        })
        return arrDoctor;

    }

    const handleChangeDatePicker = (date) => {
        setCurrentDate(date)
    }

    const handleChooseSchedule = (schedule) => {
        let arrScheduleNew = [...schedules];
        if (arrScheduleNew && arrScheduleNew.length > 0) {
            arrScheduleNew.map((item, index) => {
                if (item.id === schedule.id) {
                    item.selected = !item.selected;
                    return item
                }

            })
            setSchedules(arrScheduleNew)
        }
    }

    const handleSaveSchedule = async () => {
        let dataSend = []
        if (!currentDate) {
            toast.error('Missing date!')
            return
        }
        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Please choose a doctor!')
            return
        }
        let dateFormat = moment(currentDate).format('DD/MM/YYYY')
        let arrSchedule = schedules.filter(item => item.selected === true)
        if (arrSchedule && arrSchedule.length > 0) {
            arrSchedule.map((item, index) => {
                let obj = {}
                obj.doctorId = selectedDoctor
                obj.date = dateFormat
                obj.timeType = item.keyCode
                dataSend.push(obj)
            })
        } else {
            toast.error('Please select schedule!')
            return
        }
        let res = await createSchedule({
            schedules: dataSend,
            doctorId: selectedDoctor,
            date: dateFormat
        })
        if (res.EC === 0) {
            toast.success(res.EM)
        } else if (res.EC === 100) {
            toast.warning(res.EM)

        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='manage-schedule-container container'>
            <div className='manage-schedule-heading'>
                <span className='manage-schedule-title'><FormattedMessage id='admin-manage-schedule.title' /></span>
            </div>

            <div className='manage-schedule-content'>
                <div className='select-doctors'>
                    <Select
                        value={doctorSelect && doctorSelect}
                        options={doctors.length > 0 ? doctors : []}
                        placeholder={<FormattedMessage id='admin-manage-doctor.select-doctor' />}
                        onChange={(e) => handleSelectDoctor(e)}
                    />
                </div>

                <div className='select-date'>
                    <DatePicker className='form-select select-date-picker w-100'
                        selected={currentDate}
                        onChange={(date) => handleChangeDatePicker(date)}
                        minDate={new Date()}
                    />
                </div>

            </div>

            <div className='select-schedules'>
                {schedules && schedules.length > 0 &&
                    schedules.map((item, index) => {
                        return (
                            <span key={index + 'schedule'}
                                className={item.selected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                onClick={() => handleChooseSchedule(item)}
                            >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</span>
                        )
                    })

                }
            </div>
            <div className="btn-save">
                <button className='btn btn-primary'
                    onClick={() => handleSaveSchedule()}
                ><FormattedMessage id='admin-manage-doctor.save-info' /></button>
            </div>
        </div>
    )
}

export default ManageSchedules