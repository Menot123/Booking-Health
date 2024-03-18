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
    postDataCreateSpecialty, getSpecialties, getDetailSpecialty, postDataUpdateSpecialty,
    postDataDeleteSpecialty, getSpecialtiesPagination
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



function ManageSpecialty() {

    const currentLang = useSelector(state => state.userRedux.currentLang)


    const [nameVi, setNameVi] = useState('')
    const [nameEn, setNameEn] = useState('')

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
    const [specialties, setSpecialties] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [idSpecialtySelect, setIdSpecialtySelect] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [currentLimit, setCurrentLimit] = useState(5)


    useEffect(() => {
        fetchSpecialtiesPagination(true)
    }, [])

    // re-render when change page
    useEffect(() => {
        fetchSpecialtiesPagination(false)
    }, [currentPage])

    const fetchSpecialtiesPagination = async (status) => {
        let res = {}
        if (status) {
            setIsLoading(true)
            res = await getSpecialtiesPagination(currentPage, currentLimit)
            setIsLoading(false)
        } else {
            res = await getSpecialtiesPagination(currentPage, currentLimit)
        }
        if (res.EC === 0 && res.DT.specialties.length > 0) {
            setSpecialties(res.DT.specialties)
            setTotalPage(res.DT.totalPage)
        } else {
            toast.error(res.EM)
        }
    }


    const handleOnchangeSelectInput = (e, type) => {
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
        setImgPreview(prevState => ({
            ...prevState,
            imgReviewUrl: ''
        }))
        setMarkdownVi(defaultMarkdownVi)
        setMarkdownEn(defaultMarkdownEn)
        setAvatar('')
    }

    const handleCreateSpecialty = async () => {
        let dataSend = {
            nameVi: nameVi,
            nameEn: nameEn,
            image: avatar,
            descriptionVi: markdownVi.textHTML,
            markdownVi: markdownVi.textMarkdown,
            descriptionEn: markdownEn.textHTML,
            markdownEn: markdownEn.textMarkdown,

        }
        let res = await postDataCreateSpecialty(dataSend)
        if (+res.EC === 0) {
            fetchSpecialtiesPagination(false)
            toast.success(res.EM)
            setDefaultState()
        } else {
            toast.error(res.EM)
        }
    }

    const handleSaveInfoSpecialty = async () => {
        let dataSend = {
            id: idSpecialtySelect,
            nameVi: nameVi,
            nameEn: nameEn,
            image: avatar,
            descriptionVi: markdownVi.textHTML,
            markdownVi: markdownVi.textMarkdown,
            descriptionEn: markdownEn.textHTML,
            markdownEn: markdownEn.textMarkdown,

        }
        let res = await postDataUpdateSpecialty(dataSend)
        if (+res.EC === 0) {
            setIsUpdate(false)
            fetchSpecialtiesPagination(false)
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
        setIdSpecialtySelect(id)
        let res = await getDetailSpecialty(id)
        if (res.EC === 0) {
            let dataSpecialty = res.DT
            setNameVi(dataSpecialty.nameVi)
            setNameEn(dataSpecialty.nameEn)
            setMarkdownVi(prevState => ({
                textMarkdown: dataSpecialty.markdownVi,
                textHTML: dataSpecialty.descriptionVi
            }))
            setMarkdownEn(prevState => ({
                textMarkdown: dataSpecialty.markdownEn,
                textHTML: dataSpecialty.descriptionEn
            }))
            setAvatar(convertImgBase64(dataSpecialty.image))
            setImgPreview(prevState => ({
                ...prevState,
                imgReviewUrl: convertImgBase64(dataSpecialty.image)
            }))
        }
    }

    const handleDeleteSpecialty = async (id) => {
        let res = await postDataDeleteSpecialty(id)
        fetchSpecialtiesPagination(false)
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

        <div className='manage-specialty-container'>
            <h4 className='text-center mt-3 text-uppercase'><FormattedMessage id='admin-manage-specialty.title' /></h4>
            {isLoading ? <Loader loading={isLoading} /> :
                <>
                    <div className='manage-specialty-content p-3'>

                        <table className="table table-striped table-bordered mt-3">
                            <thead className='table-header'>
                                <tr>
                                    <th style={{ width: '85%' }} scope="col"><FormattedMessage id='admin-manage-specialty.table-name-specialty' /></th>
                                    <th style={{ width: '15%' }} className='text-center' scope="col"><FormattedMessage id='admin-manage-specialty.table-actions' /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {specialties && specialties.length > 0 &&
                                    specialties.map((item, index) => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <td>{currentLang === LANGUAGES.VI ? item.nameVi : item.nameEn} </td>
                                                <td className='w-100 d-flex justify-content-center'>
                                                    <span className='icon-action-edit'><FaPencil onClick={() => handleGetDataEditSpecialty(item.id)} /></span>
                                                    <span className='icon-action-delete ms-4' onClick={() => handleDeleteSpecialty(item.id)}><FaTrashAlt /></span>
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

                        <div className='row'>


                            <div className='col-6'>
                                <label ><FormattedMessage id='admin-manage-specialty.input-name-vi' /></label>
                                <input className='form-control' type='text' value={nameVi} onChange={(e) => handleOnchangeSelectInput(e, 'vi')} />
                            </div>

                            <div className='col-6'>
                                <label ><FormattedMessage id='admin-manage-specialty.input-name-en' /></label>
                                <input className='form-control' type='text' value={nameEn} onChange={(e) => handleOnchangeSelectInput(e, 'en')} />
                            </div>

                            <div className='col-12 mt-3'>
                                <label><FormattedMessage id='admin-manage-specialty.input-descriptionVi' /></label>
                                <MdEditor
                                    style={{ height: '200px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    value={markdownVi.textMarkdown}
                                    onChange={(e) => handleChangeMarkdown(e, 'vi')}
                                />
                            </div>

                            <div className='col-12 mt-3'>
                                <label><FormattedMessage id='admin-manage-specialty.input-descriptionEn' /></label>
                                <MdEditor
                                    style={{ height: '200px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    value={markdownEn.textMarkdown}
                                    onChange={(e) => handleChangeMarkdown(e, 'en')}
                                />
                            </div>

                            <div className='col-2 mt-3'>
                                <label><FormattedMessage id='admin-manage-specialty.input-image-specialty' /></label>
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
                                        onClick={() => handleCreateSpecialty()}
                                    ><FormattedMessage id='admin-manage-specialty.btn-create-specialty' /></button>
                                    :
                                    <>
                                        <button className='btn btn-warning mt-3'
                                            onClick={() => handleSaveInfoSpecialty()}
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

export default ManageSpecialty