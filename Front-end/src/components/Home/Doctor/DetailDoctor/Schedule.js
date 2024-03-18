import React from 'react'
import './Schedule.scss'
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegHandPointUp } from "react-icons/fa";
import BookingModal from '../Modal/BookingModal';
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../../utils/index'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { getSchedulesByDate } from '../../../../services/userService'
import { v4 as uuidv4 } from 'uuid';
import { FormattedMessage } from 'react-intl'
import { getDataProfileDoctor, checkFullScheduleDoctor } from '../../../../services/userService'
import { toast } from 'react-toastify';
import _ from 'lodash'

function Schedule(props) {

    const language = useSelector(state => state.userRedux.currentLang)
    const [listday, setListday] = useState([])
    const [schedules, setSchedules] = useState([])
    const [dateSelected, setDateSelected] = useState(moment(new Date()).format('DD/MM/YYYY'))
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [profile, setProfile] = useState(null)
    const [selectTime, setSelectTime] = useState(null)

    useEffect(() => {
        setListday(getDays(language))
    }, [language])

    if (schedules.length > 0) {
        const handleFullBookingSchedule = async (doctorId) => {
            let res = await checkFullScheduleDoctor(doctorId)
            if (res.EC === 0) {
                if (res.DT.length > 0) {
                    let timeTypes = res.DT.map(item => item.timeType);
                    timeTypes.forEach(timeType => {
                        let element = document.getElementById(timeType);
                        if (element) {
                            element.classList.add("disabled", "fulled");
                        }
                    });

                }
            }
        }
        handleFullBookingSchedule(props.doctorId)
    }

    useEffect(() => {
        let isMounted = true; // Biến flag để kiểm tra component có còn tồn tại hay không

        const fetchSchedulesByDate = async (doctorId, date) => {
            let res = await getSchedulesByDate(doctorId, date);
            if (isMounted && res.EC === 0) { // Kiểm tra biến flag trước khi cập nhật state
                setSchedules(res.DT);
            }
        };

        fetchSchedulesByDate(props.doctorId, dateSelected);

        return () => {
            isMounted = false; // Đặt biến flag về false khi component unmount
        };
    }, [dateSelected]);

    useEffect(() => {
        let isMounted = true; // Biến đánh dấu thành phần có được mount hay không

        const fetchDoctorProfile = async () => {
            const res = await getDataProfileDoctor(props.doctorId);
            if (isMounted) {
                // Kiểm tra xem thành phần có được mount hay không trước khi cập nhật state
                if (res.EC === 0) {
                    setProfile(res.DT);
                } else {
                    toast.error(res.EM);
                }
            }
        };

        fetchDoctorProfile();

        return () => {
            isMounted = false; // Đánh dấu thành phần đã bị hủy khi useEffect được gọi lần tiếp theo
        };
    }, [props.doctorId]);



    const capitalizeFirstLetter = (content) => {
        return content.charAt(0).toUpperCase() + content.slice(1);
    }

    const getDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let labelViToday = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${labelViToday}`
                    obj.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
                    obj.label = capitalizeFirstLetter(labelVi)
                }
            } else {
                if (i === 0) {
                    let labelEn = moment(new Date()).format('DD/MM')
                    let today = `Today - ${labelEn}`
                    obj.label = today
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }

            }
            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(obj)
        }


        return allDays
    }


    const handleChangeDate = (e) => {
        let dateFormat = moment(Number(e.target.value)).format('DD/MM/YYYY');
        setDateSelected(dateFormat)
    }

    const handleClickBooking = (schedule) => {
        Promise.all([setSelectTime(schedule), setIsOpenModal(true)])
    }


    return (

        <div className='doctor-schedule'>

            <div className='select-date'>
                <select className='select-date-element' onChange={(e) => handleChangeDate(e)}>
                    {
                        listday && listday.length > 0 &&
                        listday.map((item, index) => {
                            return (
                                <option value={item.value} key={index}>{item.label}</option>
                            )
                        })
                    }
                </select>
            </div>

            <div className='title-schedule'>
                <FaCalendarAlt className='icon-calendar' /> <span className='text-title'><FormattedMessage id='homepage.detail-doctor.examination-schedule' /></span>
            </div>

            <div className='schedule-item'>
                {
                    schedules && schedules.length > 0 &&
                    schedules.map((item, index) => {
                        return (
                            <span id={item?.timeType} onClick={() => handleClickBooking(item)} key={uuidv4()} className='btn btn-schedule'>{language === LANGUAGES.VI ? item.dataTime.valueVi : item.dataTime.valueEn}</span>
                        )
                    })
                }
            </div>

            <div className='instruct'>
                <span><FormattedMessage id='homepage.detail-doctor.select' /> <FaRegHandPointUp />  <FormattedMessage id='homepage.detail-doctor.booking-free' /></span>

            </div>
            <BookingModal
                isOpenModal={isOpenModal}
                handleCloseModal={() => setIsOpenModal(false)}
                doctorId={props.doctorId}
                dataProfile={profile}
                timeSchedule={selectTime}
            />
        </div>
    )
}

export default Schedule