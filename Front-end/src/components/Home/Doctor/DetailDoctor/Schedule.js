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


function Schedule() {

    const language = useSelector(state => state.userRedux.language)
    const [listday, setListday] = useState([])

    useEffect(() => {
        setListday(getDays(language))
    }, [language])

    const capitalizeFirstLetter = (content) => {
        return content.charAt(0).toUpperCase() + content.slice(1);
    }

    // console.log('moment vie:', moment(new Date()).format('dddd - DD/MM'));

    // console.log('moment en:', moment(new Date()).locale('en').format("ddd - DD/MM"));

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


    return (

        <div className='doctor-schedule'>

            <div className='select-date'>
                <select>
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
                <FaCalendarAlt className='icon-calendar' /> <span className='text-title'>Lịch khám</span>
            </div>

            <div className='schedule-item'>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
                <span className='btn btn-schedule'>9:00 - 9:30</span>
            </div>

            <div className='instruct'>
                <span>Chọn <FaRegHandPointUp />  và đặt lịch (phí đặt lịch 0đ)</span>

            </div>
            <BookingModal
                isOpenModal={true}
                closeBookingModal={''}
                dataTime={''}
            />
        </div>
    )
}

export default Schedule