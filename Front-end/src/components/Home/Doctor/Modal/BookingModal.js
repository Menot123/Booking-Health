import React from 'react'
import './BookingModal.scss'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
} from 'reactstrap';
import img_doctor from '../../../../assets/img/bs-anh-thu1.jpg'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../../utils/index'
import _ from 'lodash';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { fetchAllDataSelect, createBookingDoctor } from '../../../../services/userService'
import { v4 as uuidv4 } from 'uuid'
import { FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify';
import moment from 'moment'
import { FaBullseye } from 'react-icons/fa6';


function BookingModal(props) {
    const language = useSelector(state => state.userRedux.language)
    const [position, setPosition] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [timeBooking, setTimeBooking] = useState('')
    const [dateBooking, setDateBooking] = useState('')
    const [isSendingEmail, setIsSendingEmail] = useState(false)


    const defaultBookingInput = {
        fullName: '',
        phoneNumber: '',
        email: '',
        contact: '',
        reason: '',
        dateOfBirth: null,
        gender: '',
        doctorId: '',
        timeTypeBooking: '',
        dateSelectBooking: ''
    }

    const [bookingInput, setBookingInput] = useState(defaultBookingInput)
    const [allGender, setAllGender] = useState([])
    const validateData = ['fullName', 'phoneNumber', 'email', 'contact', 'reason', 'dateOfBirth',
        'gender', 'doctorId', 'timeTypeBooking', 'dateSelectBooking']


    useEffect(() => {
        if (!_.isEmpty(props.dataProfile)) {
            let positionDoctor = props.dataProfile?.positionData &&
                language === LANGUAGES.VI ? props.dataProfile.positionData?.valueVi + ', ' : props.dataProfile.positionData?.valueEn + ', '

            let nameDoctor = language === LANGUAGES.VI ? props.dataProfile?.lastName + ' ' + props.dataProfile?.firstName : props.dataProfile?.firstName + ' ' + props.dataProfile?.lastName

            let descriptionDoctor = props.dataProfile?.dataIdDoctor && props.dataProfile?.dataIdDoctor?.dataMarkdown &&
                props.dataProfile?.dataIdDoctor?.dataMarkdown?.description

            let priceDoctor = props.dataProfile?.dataIdDoctor && props.dataProfile?.dataIdDoctor?.dataPrice &&
                language === LANGUAGES.VI ? props.dataProfile?.dataIdDoctor?.dataPrice?.valueVi + ' VND' :
                props.dataProfile?.dataIdDoctor?.dataPrice?.valueEn + ' $'

            let idDoctor = props.dataProfile && props.dataProfile?.id

            Promise.all([setPosition(positionDoctor), setName(nameDoctor), setDescription(descriptionDoctor), setPrice(priceDoctor),
            setBookingInput(preState => ({
                ...preState,
                doctorId: idDoctor
            }))])

        }


    }, [props.dataProfile, language])

    useEffect(() => {
        let isMounted = true; // Biến đánh dấu thành phần có được mount hay không

        const getAllGender = async () => {

            let res = await fetchAllDataSelect('gender')
            if (isMounted) {
                if (res.EC === 0 && !_.isEmpty(res.DT)) {
                    setAllGender(res.DT)
                }
            }
        }
        getAllGender()
        return () => {
            isMounted = false; // Đánh dấu thành phần đã bị hủy khi useEffect được gọi lần tiếp theo
        };
    }, [])

    useEffect(() => {

        let timeSelect = language === LANGUAGES.VI ? props.timeSchedule?.dataTime?.valueVi : props.timeSchedule?.dataTime?.valueEn
        let timeTypeBooking = props.timeSchedule && props.timeSchedule?.timeType
        let dateSelect = props.timeSchedule?.date
        Promise.all([setTimeBooking(timeSelect), setDateBooking(dateSelect),
        setBookingInput(preState => ({
            ...preState,
            timeTypeBooking: timeTypeBooking,
            dateSelectBooking: dateSelect
        }))])

    }, [props.timeSchedule, language])

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleOnchangeInputBooking = (e, type) => {
        let value = e.target.value
        setBookingInput(prevState => ({
            ...prevState,
            [type]: value
        }));
    }

    const handleChangeDatePicker = (date) => {
        setBookingInput(prevState => ({
            ...prevState,
            dateOfBirth: date
        }));
    }

    const buildNameDoctor = (dataName) => {
        let name = ''
        if (dataName && !_.isEmpty(dataName)) {
            name = language === LANGUAGES.VI ? dataName?.lastName + ' ' + dataName.firstName
                :
                dataName?.firstName + ' ' + dataName.lastName
        }
        return name
    }

    const validateDataSend = (data) => {
        const missingFields = [];

        validateData.forEach((fieldName) => {
            if (!data[fieldName]) {
                missingFields.push(fieldName);
            }
        });
        return missingFields;
    }

    const handleClickBooking = async () => {
        let checkValidateData = []
        checkValidateData = validateDataSend(bookingInput)
        if (checkValidateData.length > 0) {
            toast.error(<FormattedMessage id='homepage.detail-doctor.message-validate' />)
            return;
        }
        setIsSendingEmail(true)
        let nameDoctorBooking = buildNameDoctor(props.dataProfile)
        const formattedDate = moment(bookingInput.dateOfBirth).format('DD/MM/yyyy')
        let dateTimeMailer = timeBooking + ' Ngày ' + dateBooking
        let dataSend = {
            fullName: bookingInput.fullName,
            phoneNumber: bookingInput.phoneNumber,
            email: bookingInput.email,
            contact: bookingInput.contact,
            reason: bookingInput.reason,
            dateOfBirth: formattedDate,
            gender: bookingInput.gender,
            doctorId: bookingInput.doctorId,
            timeTypeBooking: bookingInput.timeTypeBooking,
            dateSelectBooking: bookingInput.dateSelectBooking,
            currentLang: language,
            dateTimeMailer: dateTimeMailer,
            nameDoctorBooking: nameDoctorBooking
        }
        let res = await createBookingDoctor(dataSend)
        setIsSendingEmail(false)
        setBookingInput(defaultBookingInput)

        if (+res.EC === 0) {
            toast.success('Booking appointment was successfully')
            props.handleCloseModal()
        } else {
            toast.error('Booking appointment error!')
        }
    }

    return (
        <>
            {isSendingEmail
                ?
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
                : ''
            }
            <Modal
                isOpen={props.isOpenModal}
                toggle={props.handleCloseModal}
                className={'modal-booking'}
                backdrop={true}
                size='lg'
            >
                <ModalHeader toggle={props.handleCloseModal}>Thông tin đặt lịch khám bệnh</ModalHeader>
                <ModalBody>
                    <div className='modal-content-body p-3'>
                        <div className='doctor-profile'>
                            <div className='doctor-profile-avatar'>
                                <img className='img-doctor' alt='img-doctor' src={props.dataProfile && props.dataProfile.image &&
                                    convertImgBase64(props.dataProfile.image)
                                } />
                            </div>
                            <div className='doctor-profile-info'>
                                <div className='doctor-profile-info-name'>
                                    <span className='profile-info-name-text'>
                                        {position} {name}
                                    </span>
                                </div>
                                <div className='doctor-profile-info-description'>
                                    <span className='info-description-text'>
                                        {timeBooking}  - {dateBooking}
                                    </span>
                                    <br />
                                    <span>
                                        <FormattedMessage id='detail-doctor-booking-modal.free-booking' />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='modal-content-price'>
                            <span><FormattedMessage id='detail-doctor-booking-modal.price' /> {price}</span>
                        </div>

                        <div className='row'>

                            <div className='modal-content-name col-6'>
                                <label htmlFor='input-name'><FormattedMessage id='detail-doctor-booking-modal.full-name' /></label>
                                <input className='form-control' type='text' id='input-name' value={bookingInput.fullName} onChange={(e) => handleOnchangeInputBooking(e, 'fullName')} />
                            </div>

                            <div className='modal-content-phone col-6'>
                                <label htmlFor='input-phone'><FormattedMessage id='detail-doctor-booking-modal.phone' /></label>
                                <input className='form-control' type='tel' id='input-phone' value={bookingInput.phoneNumber} onChange={(e) => handleOnchangeInputBooking(e, 'phoneNumber')} />
                            </div>

                            <div className='modal-content-email col-6 my-2'>
                                <label htmlFor='input-email'><FormattedMessage id='detail-doctor-booking-modal.email' /></label>
                                <input className='form-control' type='tel' id='input-email' value={bookingInput.email} onChange={(e) => handleOnchangeInputBooking(e, 'email')} />
                            </div>

                            <div className='modal-content-contact col-6 my-2'>
                                <label htmlFor='input-contact'><FormattedMessage id='detail-doctor-booking-modal.address' /></label>
                                <input className='form-control' type='tel' id='input-contact' value={bookingInput.contact} onChange={(e) => handleOnchangeInputBooking(e, 'contact')} />
                            </div>

                            <div className='modal-content-reason col-12 my-2'>
                                <label htmlFor='input-reason'><FormattedMessage id='detail-doctor-booking-modal.reason' /></label>
                                <input className='form-control' type='tel' id='input-reason' value={bookingInput.reason} onChange={(e) => handleOnchangeInputBooking(e, 'reason')} />
                            </div>

                            <div className='modal-content-birth col-6'>
                                <label htmlFor='input-birth'><FormattedMessage id='detail-doctor-booking-modal.birth' /></label>
                                <DatePicker id='input-birth' className='form-control select-date-picker w-100'
                                    selected={bookingInput.dateOfBirth}
                                    onChange={(date) => handleChangeDatePicker(date)}
                                    locale={language === LANGUAGES.VI ? "vi" : 'en'}
                                />
                            </div>

                            <div className='modal-content-gender col-6'>
                                <label htmlFor='input-gender'><FormattedMessage id='detail-doctor-booking-modal.gender' /></label>
                                <select className='form-select' value={bookingInput.gender}
                                    onChange={(e) => handleOnchangeInputBooking(e, 'gender')} >

                                    <FormattedMessage id='admin-form-CRUD.select-gender'>
                                        {(msg) => (<option hidden>{msg}</option>)}
                                    </FormattedMessage>
                                    {
                                        allGender && allGender.length > 0 &&
                                        allGender.map((item, index) => {
                                            return (
                                                <option key={uuidv4()} value={item.keyCode}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )

                                        })
                                    }
                                </select>
                            </div>

                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleClickBooking()}>
                        Xác nhận
                    </Button>
                    <Button color="secondary" onClick={props.handleCloseModal}>
                        Hủy bỏ
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default BookingModal