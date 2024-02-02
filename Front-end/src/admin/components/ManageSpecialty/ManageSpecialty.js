import React from 'react'
import './ManageSpecialty.scss'
import { FormattedMessage } from 'react-intl'
import Select from 'react-select'
import { useState } from 'react'
import { FaUpload } from "react-icons/fa";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { postDataCreateSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify'

const mdParser = new MarkdownIt(/* Markdown-it options */);



function ManageSpecialty() {

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
    }

    const handleSaveInfoSpecialty = async () => {
        let dataSend = {
            nameVi: nameVi,
            nameEn: nameEn,
            image: avatar,
            descriptionVi: markdownVi.textHTML,
            descriptionEn: markdownEn.textHTML,
        }
        let res = await postDataCreateSpecialty(dataSend)
        if (+res.EC === 0) {
            toast.success(res.EM)
            setDefaultState()
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='manage-specialty-container'>
            <h4 className='text-center mt-3 text-uppercase'><FormattedMessage id='admin-manage-specialty.title' /></h4>
            <div className='manage-specialty-content p-3'>
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
                        <button className='btn btn-primary mt-3'
                            onClick={() => handleSaveInfoSpecialty()}
                        ><FormattedMessage id='admin-manage-doctor.save-info' /></button>
                    </div>
                </div>

            </div>
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