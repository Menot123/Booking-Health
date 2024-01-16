import React from 'react'
import './ManageDoctors'
import Select from 'react-select'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {
    getAllDoctor, getInfoDoctor, getAllPrice, getAllPayment,
    getAllProvince, getAllSpecialties, getAllClinic
} from '../../../services/userService'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/index'
import { FormattedMessage } from 'react-intl'




const mdParser = new MarkdownIt(/* Markdown-it options */);

function ManageDoctors() {

    const language = useSelector(state => state.userRedux.language)


    const [doctors, setDoctors] = useState([])
    const [prices, setPrices] = useState([])
    const [payments, setPayments] = useState([])
    const [provinces, setProvinces] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [clinics, setClinics] = useState([])

    const getDoctors = async () => {
        let res = await getAllDoctor()
        if (res.DT) {
            let doctors = res.DT
            setDoctors(doctors)
        } else {
            toast.error(res.EM)
        }
    }

    const getPrices = async () => {
        let res = await getAllPrice()
        if (res.DT) {
            let prices = res.DT
            setPrices(prices)
        } else {
            toast.error(res.EM)
        }
    }

    const getPayments = async () => {
        let res = await getAllPayment()
        if (res.DT) {
            let payments = res.DT
            setPayments(payments)
        } else {
            toast.error(res.EM)
        }
    }

    const getProvinces = async () => {
        let res = await getAllProvince()
        if (res.DT) {
            let provinces = res.DT
            setProvinces(provinces)
        } else {
            toast.error(res.EM)
        }
    }

    const getSpecialties = async () => {
        let res = await getAllSpecialties()
        if (res.DT) {
            let specialties = res.DT
            setSpecialties(specialties)
        } else {
            toast.error(res.EM)
        }
    }

    const getClinics = async () => {
        let res = await getAllClinic()
        if (res.DT) {
            let clinics = res.DT
            setClinics(clinics)
        } else {
            toast.error(res.EM)
        }
    }

    // Get data select
    useEffect(() => {
        getDoctors()
        getPrices()
        getPayments()
        getProvinces()
        getSpecialties()
        getClinics()
    }, [])

    const buildDataSelect = (data, type) => {
        switch (type) {
            case 'doctor':
                let arrDoctor = []
                data.forEach((item) => {
                    let doctorDataBuild = {
                        value: item.id,
                        label: item.lastName + ' ' + item.firstName
                    }
                    arrDoctor.push(doctorDataBuild)
                })
                return arrDoctor;
            case 'price':
                let arrPrice = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.id,
                        label: language === LANGUAGES.VI ? item.valueVi + ' VND' : item.valueEn + '$'
                    }
                    arrPrice.push(priceDataBuild)
                })
                return arrPrice;
            case 'payment':
                let arrPayment = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.id,
                        label: language === LANGUAGES.VI ? item.valueVi : item.valueEn
                    }
                    arrPayment.push(priceDataBuild)
                })
                return arrPayment;
            case 'province':
                let arrProvince = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.id,
                        label: language === LANGUAGES.VI ? item.valueVi : item.valueEn
                    }
                    arrProvince.push(priceDataBuild)
                })
                return arrProvince;
            case 'specialty':
                let arrSpecialty = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.id,
                        label: language === LANGUAGES.VI ? item.nameVi : item.nameEn
                    }
                    arrSpecialty.push(priceDataBuild)
                })
                return arrSpecialty;
            case 'clinic':
                let arrClinic = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.id,
                        label: language === LANGUAGES.VI ? item.nameVi : item.nameEn
                    }
                    arrClinic.push(priceDataBuild)
                })
                return arrClinic;
            default:
                return;
        }
    }

    const optionDoctors = buildDataSelect(doctors, 'doctor')
    const optionPrices = buildDataSelect(prices, 'price')
    const optionPayments = buildDataSelect(payments, 'payment')
    const optionProvinces = buildDataSelect(provinces, 'province')
    const optionSpecialty = buildDataSelect(specialties, 'specialty')
    const optionClinic = buildDataSelect(clinics, 'clinic')

    const doctorDataDefault = {
        introduction: '',
        price: '',
        payment: '',
        province: '',
        nameClinic: '',
        addressClinic: '',
        note: '',
        specialty: '',
        clinic: ''
    }

    const [doctorInfo, setDoctorInfo] = useState(doctorDataDefault)

    const handleSelectDoctor = async (e) => {
        let idDoctor = e.value
        if (idDoctor) {
            let res = await getInfoDoctor(idDoctor)
            if (res.DT) {
                let dataSet = {
                    introduction: '',
                    price: '',
                    payment: '',
                    province: '',
                    nameClinic: res.DT.nameClinic,
                    addressClinic: res.DT.addressClinic,
                    note: res.DT.note,
                    specialty: '',
                    clinic: ''
                }
                setDoctorInfo(dataSet)
            }
        }
    }

    return (
        <div className='manage-doctors-container'>
            <h4 className='text-center mt-3 text-uppercase'><FormattedMessage id='admin-manage-doctor.add-info-doctor' /></h4>
            <div className='manage-doctor-content p-3'>
                <div className='row'>
                    <div className='col-4'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-doctor' /></label>
                        <Select
                            options={optionDoctors}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-doctor' />}
                            onChange={(e) => handleSelectDoctor(e)}
                        />
                    </div>
                    <div className='col-8 form-group'>
                        <label htmlFor='input-info-doctor'><FormattedMessage id='admin-manage-doctor.introductory-information' /></label>
                        <input className='form-control' id='input-info-doctor' value={doctorInfo.introduction} />
                    </div>

                    <div className='col-4 my-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.medical-examination-price' /></label>
                        <Select
                            options={optionPrices}
                            placeholder={<FormattedMessage id='admin-manage-doctor.medical-examination-price' />}
                        />
                    </div>

                    <div className='col-4 my-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.payment-methods' /></label>
                        <Select
                            options={optionPayments}
                            placeholder={<FormattedMessage id='admin-manage-doctor.payment-methods' />}
                        />
                    </div>

                    <div className='col-4 my-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.province' /></label>
                        <Select
                            options={optionProvinces}
                            placeholder={<FormattedMessage id='admin-manage-doctor.province' />}
                        />
                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-name-clinic'><FormattedMessage id='admin-manage-doctor.name-clinic' /></label>
                        <input className='form-control' id='input-info-name-clinic' value={doctorInfo.nameClinic} />
                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-address'><FormattedMessage id='admin-manage-doctor.address-clinic' /></label>
                        <input className='form-control' id='input-info-address' value={doctorInfo.addressClinic} />

                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-note'><FormattedMessage id='admin-manage-doctor.note' /></label>
                        <input className='form-control' id='input-info-note' value={doctorInfo.note} />

                    </div>

                    <div className='col-4 mb-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-specialty' /></label>
                        <Select
                            options={optionSpecialty}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-specialty' />}
                        />
                    </div>

                    <div className='col-4 mb-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-clinic' /></label>
                        <Select
                            options={optionClinic}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-clinic' />}
                        />
                    </div>

                    <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)} />

                    <div>
                        <button className='btn btn-primary mt-3'><FormattedMessage id='admin-manage-doctor.save-info' /></button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ManageDoctors