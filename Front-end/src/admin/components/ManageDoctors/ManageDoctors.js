import React from 'react'
import './ManageDoctors'
import Select from 'react-select'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {
    getAllDoctor, getInfoDoctor, getAllPrice, getAllPayment,
    getAllProvince, getAllSpecialties, getAllClinic, updateInfoDoctor
} from '../../../services/userService'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/index'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'



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
        Promise.all([getDoctors(), getPrices(), getPayments(), getProvinces(), getSpecialties(), getClinics()])
    }, []);

    const buildDataSelect = (data, type) => {
        switch (type) {
            case 'doctor':
                let arrDoctor = []
                data.forEach((item) => {
                    let doctorDataBuild = {
                        value: item.id,
                        label: item.firstName + ' ' + item.lastName
                    }
                    arrDoctor.push(doctorDataBuild)
                })
                return arrDoctor;
            case 'price':
                let arrPrice = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.keyCode,
                        label: language === LANGUAGES.VI ? item.valueVi + ' VND' : item.valueEn + '$'
                    }
                    arrPrice.push(priceDataBuild)
                })
                return arrPrice;
            case 'payment':
                let arrPayment = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.keyCode,
                        label: language === LANGUAGES.VI ? item.valueVi : item.valueEn
                    }
                    arrPayment.push(priceDataBuild)
                })
                return arrPayment;
            case 'province':
                let arrProvince = []
                data.forEach((item) => {
                    let priceDataBuild = {
                        value: item.keyCode,
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
        doctorId: '',
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
    const [selectPrice, setSelectPrice] = useState(null)
    const [selectProvince, setSelectProvince] = useState(null)
    const [selectPayment, setSelectPayment] = useState(null)
    const [selectSpecialty, setSelectSpecialty] = useState(null)
    const [selectClinic, setSelectClinic] = useState(null)
    const [selectDoctor, setSelectDoctor] = useState(null)
    const defaultMarkdown = {
        textMarkdown: '',
        textHTML: ''
    }
    const [markdown, setMarkdown] = useState(defaultMarkdown)

    const buildSetDataSelect = (data, type) => {
        switch (type) {
            case 'price':
                optionPrices.forEach(item => {
                    if (item.value === data) {
                        setSelectPrice(item)
                    }
                })
                break;
            case 'province':
                optionProvinces.forEach(item => {
                    if (item.value === data) {
                        setSelectProvince(item)
                    }
                })
                break;
            case 'payment':
                optionPayments.forEach(item => {
                    if (item.value === data) {
                        setSelectPayment(item)
                    }
                })
                break;
            case 'specialty':
                optionSpecialty.forEach(item => {
                    if (item.value === data) {
                        setSelectSpecialty(item)
                    }
                })
                break;
            case 'clinic':
                optionClinic.forEach(item => {
                    if (item.value === data) {
                        setSelectClinic(item)
                    }
                })
                break;
            case 'doctorId':
                optionDoctors.forEach(item => {
                    if (item.value === data) {
                        setSelectDoctor(item)
                    }
                })
                break;
            default:
            // code block
        }

    }

    const handleSelectDoctor = async (e) => {
        let idDoctor = e.value
        setDefaultDataInput()
        if (idDoctor) {
            let res = await getInfoDoctor(idDoctor)
            if (res.EC === 0 && res.DT) {
                let dataSet = {
                    doctorId: res.DT.doctorId,
                    introduction: res.DT.dataMarkdown?.description,
                    price: res.DT.priceId,
                    payment: res.DT.paymentId,
                    province: res.DT.provinceId,
                    nameClinic: res.DT.nameClinic,
                    addressClinic: res.DT.addressClinic,
                    note: res.DT.note,
                    specialty: res.DT.specialtyId,
                    clinic: res.DT.clinicId,
                }
                const dataSets = [
                    { data: dataSet.price, type: 'price' },
                    { data: dataSet.province, type: 'province' },
                    { data: dataSet.payment, type: 'payment' },
                    { data: dataSet.specialty, type: 'specialty' },
                    { data: dataSet.clinic, type: 'clinic' },
                    { data: dataSet.doctorId, type: 'doctorId' },
                ];
                setMarkdown({
                    textMarkdown: res.DT.dataMarkdown?.textMarkdown,
                    textHTML: res.DT.dataMarkdown?.textHTML
                })

                dataSets.forEach(({ data, type }) => {
                    buildSetDataSelect(data, type);
                });
                let isEmpty = false;
                // Kiểm tra từng thuộc tính trong dataSet
                for (const key in dataSet) {
                    if (!dataSet[key]) {
                        isEmpty = true;
                        break;
                    }
                }
                if (isEmpty) {
                    toast.error('Error when getting doctor data for update!');
                } else {
                    setDoctorInfo(dataSet);
                }
            } else {
                let dataSet = {
                    doctorId: idDoctor,
                }
                const dataSets = [
                    { data: dataSet.doctorId, type: 'doctorId' },
                ];

                dataSets.forEach(({ data, type }) => {
                    buildSetDataSelect(data, type);
                });

                setDoctorInfo((preState) => ({ ...preState, doctorId: idDoctor }))
            }
        }
    }

    const handleOnchangeSelectInput = (e, type) => {
        switch (type) {
            case 'price':
                setSelectPrice(e)
                setDoctorInfo((preState) => ({ ...preState, price: e.value }))
                break;
            case 'province':
                setSelectProvince(e)
                setDoctorInfo((preState) => ({ ...preState, province: e.value }))
                break;
            case 'payment':
                setSelectPayment(e)
                setDoctorInfo((preState) => ({ ...preState, payment: e.value }))
                break;
            case 'specialty':
                setSelectSpecialty(e)
                setDoctorInfo((preState) => ({ ...preState, specialty: e.value }))
                break;
            case 'clinic':
                setSelectClinic(e)
                setDoctorInfo((preState) => ({ ...preState, clinic: e.value }))
                break;
            default:
            // code block
        }
    }

    const handleChangeInputText = (data, type) => {
        switch (type) {
            case 'address':
                setDoctorInfo((preState) => ({ ...preState, addressClinic: data }))
                break;
            case 'note':
                setDoctorInfo((preState) => ({ ...preState, note: data }))
                break;
            case 'nameClinic':
                setDoctorInfo((preState) => ({ ...preState, nameClinic: data }))
                break;
            case 'introduction':
                setDoctorInfo((preState) => ({ ...preState, introduction: data }))
                break;
            default:
        }
    }

    const handleChangeMarkdown = (e) => {
        setMarkdown({
            textHTML: e.html,
            textMarkdown: e.text
        })
    }

    const handleSaveDoctorInfo = async () => {
        let dataSend = {
            ...doctorInfo,
            ...markdown,
        }
        const checkEmptyData = Object.keys(dataSend).map(key => {
            if ((dataSend[key] === null || dataSend[key] === undefined || dataSend[key] === '') && key !== 'doctorId') {
                return key;
            }
        });

        const filteredFields = checkEmptyData.filter(field => field !== undefined);

        if (filteredFields.length > 0) {
            toast.error(`Missing fields: ` + filteredFields.join(' , '))
        } else {
            let res = await updateInfoDoctor(dataSend)
            if (res.EC === 0) {
                setDefaultDataInput()
                toast.success(res.EM)
            } else {
                toast.error(res.EM)
            }
        }
    }

    const setDefaultDataInput = () => {
        setDoctorInfo(doctorDataDefault)
        setMarkdown(defaultMarkdown)
        setSelectPrice(null)
        setSelectProvince(null)
        setSelectPayment(null)
        setSelectSpecialty(null)
        setSelectClinic(null)
        setSelectDoctor(null)
    }

    return (
        <div className='manage-doctors-container'>
            <h4 className='text-center mt-3 text-uppercase'><FormattedMessage id='admin-manage-doctor.add-info-doctor' /></h4>
            <div className='manage-doctor-content p-3'>
                <div className='row'>
                    <div className='col-4'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-doctor' /></label>
                        <Select
                            value={selectDoctor && selectDoctor}
                            options={optionDoctors}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-doctor' />}
                            onChange={(e) => handleSelectDoctor(e)}
                        />
                    </div>

                    <div className='col-4'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-clinic' /></label>
                        <Select
                            value={selectClinic && selectClinic}
                            options={optionClinic}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-clinic' />}
                            onChange={(e) => handleOnchangeSelectInput(e, 'clinic')}

                        />
                    </div>

                    <div className='col-4 '>
                        <label ><FormattedMessage id='admin-manage-doctor.medical-examination-price' /></label>
                        <Select
                            value={selectPrice && selectPrice}
                            options={optionPrices}
                            placeholder={<FormattedMessage id='admin-manage-doctor.medical-examination-price' />}
                            onChange={(e) => handleOnchangeSelectInput(e, 'price')}
                        />
                    </div>

                    <div className='col-4 my-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.payment-methods' /></label>
                        <Select
                            value={selectPayment && selectPayment}
                            options={optionPayments}
                            placeholder={<FormattedMessage id='admin-manage-doctor.payment-methods' />}
                            onChange={(e) => handleOnchangeSelectInput(e, 'payment')}
                        />
                    </div>

                    <div className='col-4 my-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.province' /></label>
                        <Select
                            value={selectProvince && selectProvince}
                            options={optionProvinces}
                            placeholder={<FormattedMessage id='admin-manage-doctor.province' />}
                            onChange={(e) => handleOnchangeSelectInput(e, 'province')}

                        />
                    </div>

                    <div className='col-4 my-3'>
                        <label ><FormattedMessage id='admin-manage-doctor.select-specialty' /></label>
                        <Select
                            value={selectSpecialty && selectSpecialty}
                            options={optionSpecialty}
                            placeholder={<FormattedMessage id='admin-manage-doctor.select-specialty' />}
                            onChange={(e) => handleOnchangeSelectInput(e, 'specialty')}


                        />
                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-address'><FormattedMessage id='admin-manage-doctor.address-clinic' /></label>
                        <input className='form-control' id='input-info-address'
                            value={doctorInfo.addressClinic}
                            onChange={(e) => handleChangeInputText(e.target.value, 'address')}
                        />

                    </div>

                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-note'><FormattedMessage id='admin-manage-doctor.note' /></label>
                        <input className='form-control' id='input-info-note'
                            value={doctorInfo.note}
                            onChange={(e) => handleChangeInputText(e.target.value, 'note')}
                        />
                    </div>


                    <div className='col-4 mb-3'>
                        <label htmlFor='input-info-name-clinic'><FormattedMessage id='admin-manage-doctor.name-clinic' /></label>
                        <input className='form-control' id='input-info-name-clinic'
                            value={doctorInfo.nameClinic}
                            onChange={(e) => handleChangeInputText(e.target.value, 'nameClinic')}
                        />
                    </div>

                    <div className='col form-group mb-3'>
                        <label htmlFor='input-info-doctor'><FormattedMessage id='admin-manage-doctor.introductory-information' /></label>
                        <textarea className='form-control'
                            id='input-info-doctor'
                            value={doctorInfo.introduction}
                            onChange={(e) => handleChangeInputText(e.target.value, 'introduction')}
                        />
                    </div>

                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        value={markdown.textMarkdown}
                        onChange={(e) => handleChangeMarkdown(e)}
                    />

                    <div>
                        <button className='btn btn-primary mt-3'
                            onClick={() => handleSaveDoctorInfo()}
                        ><FormattedMessage id='admin-manage-doctor.save-info' /></button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ManageDoctors