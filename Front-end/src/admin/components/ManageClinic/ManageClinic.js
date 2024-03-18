import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { useState } from 'react'
import { FaUpload } from "react-icons/fa";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import {
    postDataCreateClinic, getClinics, getDetailClinic, postDataUpdateClinic,
    postDataDeleteClinic, getClinicsPagination
} from '../../../services/userService'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Loader from '../Loader/Loader';
import ReactPaginate from 'react-paginate';
import { LANGUAGES } from '../../../utils'
import { useSelector } from 'react-redux';



const mdParser = new MarkdownIt(/* Markdown-it options */);



function ManageClinic() {

    const currentLang = useSelector(state => state.userRedux.currentLang)


    const [nameVi, setNameVi] = useState('')
    const [nameEn, setNameEn] = useState('')
    const [addressEn, setAddressEn] = useState('')
    const [addressVi, setAddressVi] = useState('')

    const [imgPreview, setImgPreview] = useState({
        isOpen: false,
        imgReviewUrl: ''
    })
    const [avatar, setAvatar] = useState('')

    const defaultMarkdownVi = {
        textMarkdown: '',
        textHTML: ''
    }

    const defaultMarkdownEn = {
        textMarkdown: '',
        textHTML: ''
    }
    const [markdownVi, setMarkdownVi] = useState(defaultMarkdownVi)
    const [markdownEn, setMarkdownEn] = useState(defaultMarkdownEn)
    const [clinics, setClinics] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [idClinicSelect, setIdClinicSelect] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [currentLimit, setCurrentLimit] = useState(5)


    useEffect(() => {
        fetchClinicsPagination(true)
    }, [])

    // re-render when change page
    useEffect(() => {
        fetchClinicsPagination(false)
    }, [currentPage])


    const fetchClinicsPagination = async (status) => {
        let res = {}
        if (status) {
            setIsLoading(true)
            res = await getClinicsPagination(currentPage, currentLimit)
            setIsLoading(false)
        } else {
            res = await getClinicsPagination(currentPage, currentLimit)
        }
        if (+res.EC === 0 && res.DT.clinics.length > 0) {
            setClinics(res.DT.clinics)
            setTotalPage(res.DT.totalPage)
        } else {
            toast.error(res.EM)
        }
    }


    const handleOnchangeInputName = (e, type) => {
        switch (type) {
            case 'vi':
                setNameVi(e.target.value)
                break;
            case 'en':
                setNameEn(e.target.value)
                break;
            default:
            // code block
        }
    }

    const handleOnchangeInputAddress = (e, type) => {
        switch (type) {
            case 'vi':
                setAddressVi(e.target.value)
                break;
            case 'en':
                setAddressEn(e.target.value)
                break;
            default:
            // code block
        }
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const handleChangeImage = async (e) => {
        let dataFile = e.target.files
        let img = dataFile[0]
        if (img) {
            let imgBase64 = await getBase64(img)
            let objUrl = URL.createObjectURL(img)
            setImgPreview(prevState => ({
                ...prevState,
                imgReviewUrl: objUrl
            }));
            setAvatar(imgBase64)
            // setInputData(prevData => ({
            //     ...prevData,
            //     avatar: imgBase64
            // }));
        }
    }

    const openPreviewImage = () => {
        if (!imgPreview.imgReviewUrl) {
            return;
        }
        setImgPreview(prevState => ({
            ...prevState,
            isOpen: true
        }));
    }

    const handleChangeMarkdown = (e, type) => {
        if (type === 'vi') {
            setMarkdownVi({
                textHTML: e.html,
                textMarkdown: e.text
            })
        }
        if (type === 'en') {
            setMarkdownEn({
                textHTML: e.html,
                textMarkdown: e.text
            })
        }
    }

    const setDefaultState = () => {
        setNameVi('')
        setNameEn('')
        setAddressEn('')
        setAddressVi('')
        setImgPreview(prevState => ({
            ...prevState,
            imgReviewUrl: ''
        }))
        setMarkdownVi(defaultMarkdownVi)
        setMarkdownEn(defaultMarkdownEn)
        setAvatar('')
    }

    const handleCreateClinic = async () => {
        let dataSend = {
            nameVi: nameVi,
            nameEn: nameEn,
            addressVi: addressVi,
            addressEn: addressEn,
            image: avatar,
            descriptionVi: markdownVi.textHTML,
            markdownVi: markdownVi.textMarkdown,
            descriptionEn: markdownEn.textHTML,
            markdownEn: markdownEn.textMarkdown,

        }
        let res = await postDataCreateClinic(dataSend)
        if (+res.EC === 0) {
            fetchClinicsPagination(false)
            toast.success(res.EM)
            setDefaultState()
        } else {
            toast.error(res.EM)
        }
    }

    const handleSaveInfoClinic = async () => {
        let dataSend = {
            id: idClinicSelect,
            nameVi: nameVi,
            nameEn: nameEn,
            addressEn: addressEn,
            addressVi: addressVi,
            image: avatar,
            descriptionVi: markdownVi.textHTML,
            markdownVi: markdownVi.textMarkdown,
            descriptionEn: markdownEn.textHTML,
            markdownEn: markdownEn.textMarkdown,

        }
        let res = await postDataUpdateClinic(dataSend)
        if (+res.EC === 0) {
            setIsUpdate(false)
            fetchClinicsPagination(false)
            toast.success(res.EM)
            setDefaultState()
        } else {
            toast.error(res.EM)
        }
    }

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleGetDataEditSpecialty = async (id) => {
        setIsUpdate(true)
        setIdClinicSelect(id)
        let res = await getDetailClinic(id)
        if (res.EC === 0) {
            let dataClinic = res.DT
            setNameVi(dataClinic.nameVi)
            setNameEn(dataClinic.nameEn)
            setAddressVi(dataClinic.addressVi)
            setAddressEn(dataClinic.addressEn)
            setMarkdownVi(prevState => ({
                textMarkdown: dataClinic.markdownVi,
                textHTML: dataClinic.descriptionVi
            }))
            setMarkdownEn(prevState => ({
                textMarkdown: dataClinic.markdownEn,
                textHTML: dataClinic.descriptionEn
            }))
            setAvatar(convertImgBase64(dataClinic.image))
            setImgPreview(prevState => ({
                ...prevState,
                imgReviewUrl: convertImgBase64(dataClinic.image)
            }))
        }
    }

    const handleDeleteClinic = async (id) => {
        let res = await postDataDeleteClinic(id)
        fetchClinicsPagination(false)
        if (res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    const handlePageClick = async (e) => {
        setCurrentPage(+e.selected + 1)
    };

    const handleCancelUpdate = () => {
        setIsUpdate(false)
        setDefaultState()
    }


    return (

        <div className='manage-clinic-container'>
            <h4 className='text-center mt-3 text-uppercase'><FormattedMessage id='admin-manage-clinic.title' /></h4>
            {isLoading ? <Loader loading={isLoading} /> :
                <>
                    <div className='manage-clinic-content p-3'>

                        <table className="table table-striped table-bordered mt-3">
                            <thead className='table-header'>
                                <tr>
                                    <th style={{ width: '85%' }} scope="col"><FormattedMessage id='admin-manage-clinic.table-name-clinic' /></th>
                                    <th style={{ width: '15%' }} className='text-center' scope="col"><FormattedMessage id='admin-manage-clinic.table-actions' /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {clinics && clinics.length > 0 &&
                                    clinics.map((item, index) => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <td>{currentLang === LANGUAGES.VI ? item.nameVi : item.nameEn} </td>
                                                <td className='w-100 d-flex justify-content-center'>
                                                    <span className='icon-action-edit'><FaPencil onClick={() => handleGetDataEditSpecialty(item.id)} /></span>
                                                    <span className='icon-action-delete ms-4' onClick={() => handleDeleteClinic(item.id)}><FaTrashAlt /></span>
                                                </td>
                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </table>
                        {totalPage > 0 &&
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        }

                        <hr style={{ color: 'blue' }} />

                        <div className='row'>


                            <div className='col-6'>
                                <label ><FormattedMessage id='admin-manage-clinic.input-name-vi' /></label>
                                <input className='form-control' type='text' value={nameVi} onChange={(e) => handleOnchangeInputName(e, 'vi')} />
                            </div>

                            <div className='col-6'>
                                <label ><FormattedMessage id='admin-manage-clinic.input-name-en' /></label>
                                <input className='form-control' type='text' value={nameEn} onChange={(e) => handleOnchangeInputName(e, 'en')} />
                            </div>

                            <div className='col-6 mt-2'>
                                <label ><FormattedMessage id='admin-manage-clinic.input-address-vi' /></label>
                                <input className='form-control' type='text' value={addressVi} onChange={(e) => handleOnchangeInputAddress(e, 'vi')} />
                            </div>

                            <div className='col-6 mt-2'>
                                <label ><FormattedMessage id='admin-manage-clinic.input-address-en' /></label>
                                <input className='form-control' type='text' value={addressEn} onChange={(e) => handleOnchangeInputAddress(e, 'en')} />
                            </div>

                            <div className='col-12 mt-3'>
                                <label><FormattedMessage id='admin-manage-clinic.input-descriptionVi' /></label>
                                <MdEditor
                                    style={{ height: '200px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    value={markdownVi.textMarkdown}
                                    onChange={(e) => handleChangeMarkdown(e, 'vi')}
                                    onImageUpload={(e) => getBase64(e)}
                                />
                            </div>

                            <div className='col-12 mt-3'>
                                <label><FormattedMessage id='admin-manage-clinic.input-descriptionEn' /></label>
                                <MdEditor
                                    style={{ height: '200px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    value={markdownEn.textMarkdown}
                                    onChange={(e) => handleChangeMarkdown(e, 'en')}
                                    onImageUpload={(e) => getBase64(e)}

                                />
                            </div>

                            <div className='col-2 mt-3'>
                                <label><FormattedMessage id='admin-manage-clinic.input-image-clinic' /></label>
                                <div className='preview-img-wrapper'>
                                    <input hidden id="img-upload" type='file'
                                        onChange={(e) => handleChangeImage(e)}
                                    />
                                    <label className='label-upload' htmlFor="img-upload"><FormattedMessage id='admin-form-CRUD.upload-avatar' /><FaUpload className='ms-1 mb-1' /></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${imgPreview.imgReviewUrl})` }}
                                        onClick={() => openPreviewImage()}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                {isUpdate === false
                                    ?
                                    <button className='btn btn-primary mt-3'
                                        onClick={() => handleCreateClinic()}
                                    ><FormattedMessage id='admin-manage-clinic.btn-create-clinic' /></button>
                                    :
                                    <>
                                        <button className='btn btn-warning mt-3'
                                            onClick={() => handleSaveInfoClinic()}
                                        ><FormattedMessage id='admin-manage-doctor.save-info' /></button>
                                        <button className='btn btn-secondary mt-3 ms-3' onClick={() => handleCancelUpdate()}><FormattedMessage id='admin-manage-clinic.btn-cancel' /></button>
                                    </>
                                }
                            </div>
                        </div>

                    </div>
                </>
            }
            {
                imgPreview.isOpen === true &&
                <Lightbox
                    mainSrc={imgPreview.imgReviewUrl}
                    onCloseRequest={() =>
                        setImgPreview(prevState => ({
                            ...prevState,
                            isOpen: false
                        }))
                    }

                />
            }

        </div>


    )
}

export default ManageClinic