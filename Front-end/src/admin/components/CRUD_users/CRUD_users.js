import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './CRUD_users.scss'
import 'react-image-lightbox/style.css';
import { fetchAllUser, fetchAllGender, createNewUser, deleteUser, getDataUpdateUser, updateUserData } from '../../../services/userService'
import Loader from '../Loader/Loader';
import { v4 as uuidv4 } from 'uuid';
import { FaUpload } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Lightbox from 'react-image-lightbox';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/index'
import ReactPaginate from 'react-paginate';

function CRUD_users() {

    const currentLang = useSelector(state => state.userRedux.language)

    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [gender, setGender] = useState([])
    const [role, setRole] = useState([])
    const [position, setPosition] = useState([])
    const [avatar, setAvatar] = useState('')
    const [imgPreview, setImgPreview] = useState({
        isOpen: false,
        imgReviewUrl: ''
    })
    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(5)
    const [totalPage, setTotalPage] = useState(0)

    const defaultInputData = {
        email: '',
        password: '',
        lastName: '',
        firstName: '',
        phone: '',
        address: '',
        gender: '',
        position: '',
        role: '',
        avatar: '',
    }

    const [inputData, setInputData] = useState(defaultInputData);

    const validateData = ['email', 'password', 'lastName', 'firstName', 'phone', 'address', 'gender', 'position', 'role', 'avatar']

    const emailRef = useRef(null)

    const [isUpdate, setIsUpdate] = useState(false)

    // Fetch data
    useEffect(() => {
        getSelectData()
        getUsers()
    }, [])

    // re-render when change page
    useEffect(() => {
        getUsersWithPagination()
    }, [currentPage])

    const getUsers = async (page) => {
        setIsLoading(true)
        let res = await fetchAllUser(currentPage, currentLimit)
        if (res.EC === 0 && res.DT.users.length > 0) {
            setUsers(res.DT.users)
            setTotalPage(res.DT.totalPage)
            setIsLoading(false)
        }
    }

    const getUsersWithPagination = async (page) => {
        let res = await fetchAllUser(currentPage, currentLimit)
        if (res.EC === 0 && res.DT.users.length > 0) {
            setUsers(res.DT.users)
            setTotalPage(res.DT.totalPage)
        }
    }

    const getSelectData = async () => {
        let genderData = await fetchAllGender('gender')
        let roleData = await fetchAllGender('role')
        let positionData = await fetchAllGender('position')
        if (genderData.EC === 0 && genderData.DT.length > 0) {
            setGender(genderData.DT)
        }
        if (roleData.EC === 0 && roleData.DT.length > 0) {
            setRole(roleData.DT)
        }
        if (positionData.EC === 0 && positionData.DT.length > 0) {
            setPosition(positionData.DT)
        }

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
            setInputData(prevData => ({
                ...prevData,
                avatar: imgBase64
            }));
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

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const handleOnchangeInput = (event, element) => {
        setInputData(prevData => ({
            ...prevData,
            [element]: event.target.value
        }));
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

    const checkEmailValid = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handleCreateUser = async () => {
        let user = {
            email: inputData.email,
            password: inputData.password,
            lastName: inputData.lastName,
            firstName: inputData.firstName,
            phone: inputData.phone,
            address: inputData.address,
            gender: inputData.gender,
            position: inputData.position,
            role: inputData.role,
            avatar: inputData.avatar,
        }
        let checkEmail = checkEmailValid(user.email)
        if (!checkEmail && inputData.email.length !== 0) {
            toast.error('Invalid email please re-enter')
            emailRef.current.focus()
            return
        }
        let validateArr = validateDataSend(user)
        if (validateArr.length === 0) {
            let response = await createNewUser(user)
            if (response.EC === 0) {
                toast.success('Create user successfully')
                setInputData(defaultInputData)
                setImgPreview(prevState => ({
                    ...prevState,
                    imgReviewUrl: ''
                }));
                getUsersWithPagination()
            } else {
                toast.error(response.EM)
            }
        } else {
            const missingFieldsString = validateArr.join(', ');
            toast.error('Missing fields: ' + missingFieldsString + ', please fill them!');
        }
    }

    const handlePageClick = async (e) => {
        setCurrentPage(+e.selected + 1)
    };

    const handleDeleteUser = async (id, email) => {
        if (id && email) {
            let userDelete = { userId: id, userEmail: email }
            let response = await deleteUser(userDelete)
            if (response.EC === 0) {
                toast.success(response.EM)
                getUsersWithPagination()
            } else {
                toast.error(response.EM)
            }
        } else {
            toast.error(`Delete user ${email} failed`)
        }
    }

    const convertImgBase64 = (base64) => {
        let imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleGetDataEditUser = async (id, email) => {
        setIsUpdate(true)
        if (id && email) {
            let userUpdate = { userId: id, userEmail: email }
            let response = await getDataUpdateUser(userUpdate)
            if (response.EC === 0) {
                let userData = {
                    email: response.DT.email,
                    password: response.DT.password,
                    lastName: response.DT.lastName,
                    firstName: response.DT.firstName,
                    phone: response.DT.phoneNumber,
                    address: response.DT.address,
                    gender: response.DT.gender,
                    position: response.DT.position,
                    role: response.DT.roleId,
                    avatar: response.DT.image,
                }
                let imgReview = convertImgBase64(response.DT.image)
                setInputData(userData)
                setImgPreview(prevState => ({
                    ...prevState,
                    imgReviewUrl: imgReview
                }));
            } else {
                toast.error(response.EM)
            }
        } else {
            toast.error(`Delete user ${email} failed`)
        }
    }

    const handleUpdateUser = async () => {
        let user = {
            email: inputData.email,
            password: inputData.password,
            lastName: inputData.lastName,
            firstName: inputData.firstName,
            phone: inputData.phone,
            address: inputData.address,
            gender: inputData.gender,
            position: inputData.position,
            role: inputData.role,
            avatar: imgPreview.imgReviewUrl,
        }
        let validateArr = validateDataSend(user)
        if (validateArr.length === 0) {
            let response = await updateUserData(user)
            if (response.EC === 0) {
                toast.success(`Update user ${user.email} successfully`)
                setInputData(defaultInputData)
                setImgPreview(prevState => ({
                    ...prevState,
                    imgReviewUrl: ''
                }));
                getUsersWithPagination()
                setIsUpdate(false)
            } else {
                toast.error(response.EM)
            }
        } else {
            const missingFieldsString = validateArr.join(', ');
            toast.error('Missing fields: ' + missingFieldsString + ', please fill them!');
        }
    }


    return (
        <div>
            <h3 className='text-center mt-3'>Manage User</h3>
            <div className='container'>
                {isLoading ? <Loader loading={isLoading} /> :
                    <>
                        <div className='title-CRUD my-3'>
                            <span><FormattedMessage id='admin-form-CRUD.create-new-user' /></span>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label ref={emailRef} htmlFor='input_email'><FormattedMessage id='admin-form-CRUD.email' /></label>
                                <input disabled={isUpdate ? true : false} value={inputData.email} onChange={(e) => handleOnchangeInput(e, 'email')} className='form-control' id='input_email' type='email' />
                            </div>

                            <div className='col-3'>
                                <label htmlFor='input_password'><FormattedMessage id='admin-form-CRUD.password' /></label>
                                <input type={isUpdate ? 'password' : 'text'} disabled={isUpdate ? true : false} value={inputData.password} onChange={(e) => handleOnchangeInput(e, 'password')} className='form-control' id='input_password' />
                            </div>

                            <div className='col-3'>
                                <label htmlFor='input_last_name'><FormattedMessage id='admin-form-CRUD.firstName' /></label>
                                <input value={inputData.lastName} onChange={(e) => handleOnchangeInput(e, 'lastName')} className='form-control' id='input_last_name' type='text' />
                            </div>

                            <div className='col-3'>
                                <label htmlFor='input_first_name'><FormattedMessage id='admin-form-CRUD.lastName' /></label>
                                <input value={inputData.firstName} onChange={(e) => handleOnchangeInput(e, 'firstName')} className='form-control' id='input_first_name' type='text' />
                            </div>

                            <div className='col-3 my-3'>
                                <label htmlFor='input_phone'><FormattedMessage id='admin-form-CRUD.phone' /></label>
                                <input value={inputData.phone} onChange={(e) => handleOnchangeInput(e, 'phone')} className='form-control' id='input_phone' type='number' />
                            </div>

                            <div className='col-9 my-3'>
                                <label htmlFor='input_address'><FormattedMessage id='admin-form-CRUD.address' /></label>
                                <input value={inputData.address} onChange={(e) => handleOnchangeInput(e, 'address')} className='form-control' id='input_address' type='text' />
                            </div>

                            <div className='col-3'>


                                <label><FormattedMessage id='admin-form-CRUD.gender' /></label>
                                <select className='form-select' value={inputData.gender}
                                    onChange={(e) => handleOnchangeInput(e, 'gender')} >

                                    <FormattedMessage id='admin-form-CRUD.select-gender'>
                                        {(msg) => (<option hidden>{msg}</option>)}
                                    </FormattedMessage>
                                    {
                                        gender && gender.length > 0 &&
                                        gender.map((item, index) => {
                                            return (
                                                <option key={uuidv4()} value={item.keyCode}>{currentLang === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )

                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='admin-form-CRUD.position' /></label>
                                <select value={inputData.position} className='form-select' onChange={(e) => handleOnchangeInput(e, 'position')}>
                                    <FormattedMessage id='admin-form-CRUD.select-position'>
                                        {(msg) => (<option hidden>{msg}</option>)}
                                    </FormattedMessage>
                                    {
                                        position && position.length > 0 &&
                                        position.map((item, index) => {
                                            return (
                                                <option key={uuidv4()} value={item.keyCode}>{currentLang === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='admin-form-CRUD.role' /></label>
                                <select value={inputData.role} className='form-select' onChange={(e) => handleOnchangeInput(e, 'role')}>
                                    <FormattedMessage id='admin-form-CRUD.select-role'>
                                        {(msg) => (<option hidden>{msg}</option>)}
                                    </FormattedMessage>
                                    {
                                        role && role.length > 0 &&
                                        role.map((item, index) => {
                                            return (
                                                <option key={uuidv4()} value={item.keyCode}>{currentLang === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id='admin-form-CRUD.avatar' /></label>
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


                        </div>
                        <div className='btn-save'>
                            {
                                isUpdate
                                    ?
                                    <button onClick={() => handleUpdateUser()} className={'btn btn-warning'}> <FormattedMessage id='admin-form-CRUD.save-change' /> </button>
                                    :
                                    <button onClick={() => handleCreateUser()} className={'btn btn-primary'}> <FormattedMessage id='admin-form-CRUD.save-user' /></button>
                            }
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


                        <table className="table table-striped table-bordered mt-3">
                            <thead className='table-header'>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">First name</th>
                                    <th scope="col">Last name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 &&
                                    users.map((item, index) => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <td>{item.email} </td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td className='w-100 d-flex justify-content-center'>
                                                    <span className='icon-action-edit'><FaPencil onClick={() => handleGetDataEditUser(item.id, item.email)} /></span>
                                                    <span className='icon-action-delete ms-4' onClick={() => handleDeleteUser(item.id, item.email)}><FaTrashAlt /></span>
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
                    </>
                }
            </div>

        </div>
    )
}



export default CRUD_users