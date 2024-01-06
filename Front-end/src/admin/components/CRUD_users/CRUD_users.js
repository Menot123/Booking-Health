import React from 'react'
import { useState, useEffect } from 'react'
import './CRUD_users.scss'
import 'react-image-lightbox/style.css';
import { fetchAllUser, fetchAllGender } from '../../../services/userService'
import Loader from '../Loader/Loader';
import { v4 as uuidv4 } from 'uuid';
import { FaUpload } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Lightbox from 'react-image-lightbox';


function CRUD_users() {

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

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [lastname, setLastname] = useState('')
    // const [firstName, setFirstname] = useState('')
    // const [phone, setPhone] = useState('')
    // const [addres, setAddress] = useState('')

    const [inputData, setInputData] = useState({
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
    });

    // Fetch data
    useEffect(() => {
        getUsers()
        getSelectData()
    }, [])

    const getUsers = async () => {
        setIsLoading(true)
        let usersData = await fetchAllUser()
        if (usersData.EC === 0 && usersData.DT.length > 0) {
            setUsers(usersData.DT)
            setIsLoading(false)
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

    return (
        <div>
            <h3 className='text-center mt-3'>Manage User</h3>
            <div className='container'>
                {isLoading ? <Loader loading={isLoading} /> :
                    <>
                        <div className='title-CRUD my-3'>
                            <span>Thêm mới người dùng</span>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label htmlFor='input_email'>Email</label>
                                <input value={inputData.email} onChange={(e) => handleOnchangeInput(e, 'email')} className='form-control' id='input_email' type='email' />
                            </div>

                            <div className='col-3'>
                                <label htmlFor='input_password'>Mật khẩu</label>
                                <input value={inputData.password} onChange={(e) => handleOnchangeInput(e, 'password')} className='form-control' id='input_password' type='text' />
                            </div>

                            <div className='col-3'>
                                <label htmlFor='input_last_name'>Tên</label>
                                <input value={inputData.lastName} onChange={(e) => handleOnchangeInput(e, 'lastName')} className='form-control' id='input_last_name' type='text' />
                            </div>

                            <div className='col-3'>
                                <label htmlFor='input_first_name'>Họ</label>
                                <input value={inputData.firstName} onChange={(e) => handleOnchangeInput(e, 'firstName')} className='form-control' id='input_first_name' type='text' />
                            </div>

                            <div className='col-3 my-3'>
                                <label htmlFor='input_phone'>Số điện thoại</label>
                                <input value={inputData.phone} onChange={(e) => handleOnchangeInput(e, 'phone')} className='form-control' id='input_phone' type='number' />
                            </div>

                            <div className='col-9 my-3'>
                                <label htmlFor='input_address'>Địa chỉ</label>
                                <input value={inputData.address} onChange={(e) => handleOnchangeInput(e, 'address')} className='form-control' id='input_address' type='text' />
                            </div>

                            <div className='col-3'>
                                <label>Giới tính</label>
                                <select className='form-select' onChange={(e) => handleOnchangeInput(e, 'gender')} >
                                    {
                                        gender && gender.length > 0 &&
                                        gender.map((item, index) => {
                                            return (
                                                <option key={uuidv4()} value={item.keyCode}>{item.valueVi}</option>
                                            )

                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label>Chức danh</label>
                                <select className='form-select' onChange={(e) => handleOnchangeInput(e, 'position')}>
                                    {
                                        position && position.length > 0 &&
                                        position.map((item, index) => {
                                            return (
                                                <option key={uuidv4()} value={item.keyCode}>{item.valueVi}</option>
                                            )

                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label>Vai trò</label>
                                <select className='form-select' onChange={(e) => handleOnchangeInput(e, 'role')}>
                                    {
                                        role && role.length > 0 &&
                                        role.map((item, index) => {
                                            return (
                                                <option key={uuidv4()} value={item.keyCode}>{item.valueVi}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='col-3'>
                                <label>Ảnh đại diện</label>
                                <div className='preview-img-wrapper'>
                                    <input hidden id="img-upload" type='file'
                                        onChange={(e) => handleChangeImage(e)}
                                    />
                                    <label className='label-upload' htmlFor="img-upload">Tải ảnh lên <FaUpload /></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${imgPreview.imgReviewUrl})` }}
                                        onClick={() => openPreviewImage()}
                                    ></div>
                                </div>
                            </div>


                        </div>
                        <div className='btn-save'>
                            <button className='btn btn-primary'>Lưu user</button>
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
                                                    <span className='icon-action-edit'><FaPencil /></span>
                                                    <span className='icon-action-delete ms-4'><FaTrashAlt /></span>
                                                </td>
                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                        </table>
                    </>
                }
            </div>

        </div>
    )
}

export default CRUD_users