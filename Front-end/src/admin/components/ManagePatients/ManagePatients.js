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
import Loader from '../Loader/Loader';
registerLocale('vi', vi)

function ManagePatients() {
    const language = useSelector(state => state.userRedux.language)
    const [currentDate, setCurrentDate] = useState(null)

    const handleChangeDatePicker = (date) => {
        setCurrentDate(date)
    }

    return (
        <>
            <h3 className='text-center mt-3'>Manage User</h3>

            <div className='select-date'>
                <DatePicker className='form-select select-date-picker w-100'
                    selected={currentDate}
                    onChange={(date) => handleChangeDatePicker(date)}
                    minDate={new Date()}
                    locale={language === LANGUAGES.VI ? "vi" : 'en'}
                    placeholderText={language === LANGUAGES.VI ? "Chọn ngày" : "Select date"}
                />
            </div>
        </>
    )
}

export default ManagePatients