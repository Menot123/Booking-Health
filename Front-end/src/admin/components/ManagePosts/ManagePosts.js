import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './ManagePosts.scss'
import 'react-image-lightbox/style.css';
import { fetchAllPost, deletePost } from '../../../services/postService'
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


function ManagePosts() {

    const currentLang = useSelector(state => state.userRedux.language)

    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
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

    const defaultPostData = {
        owner: '',
        titleVi: '',
        titleEn: '',
        descriptionVi: '',
        descriptionEn: '',
        image: '',
        createDate: '',
        updateDate: '',

    }

    const [postData, setPostData] = useState(defaultPostData);

    const validateData = ['owner', 'titleVi', 'titleEn', 'descriptionVi', 'descriptionEn', 'image', 'createDate', 'updateDate']

    const emailRef = useRef(null)

    const [isUpdate, setIsUpdate] = useState(false)

    // Fetch data
    useEffect(() => {
        getPosts()
    }, [])

    // // re-render when change page
    useEffect(() => {
        getPostsWithPagination()
    }, [currentPage])

    const getPosts = async () => {
        setIsLoading(true)
        let res = await fetchAllPost(currentPage, currentLimit)
        if (res.EC === 0 && res.DT.posts.length > 0) {
            // console.log("ok")
            setPosts(res.DT.posts)
            setTotalPage(res.DT.totalPage)
            setIsLoading(false)
        }
        else {
            console.log("fail to get posts")
        }
    }

    const getPostsWithPagination = async (page) => {
        let res = await fetchAllPost(currentPage, currentLimit)
        if (res.EC === 0 && res.DT.posts.length > 0) {
            setPosts(res.DT.posts)
            setTotalPage(res.DT.totalPage)
        }
    }

    const handleDeletePost = async (id) => {
        if (id) {
            let postDelete = { postId: id }
            let response = await deletePost(postDelete)
            if (response.EC === 0) {
                toast.success(response.EM)
                getPostsWithPagination()
            } else {
                toast.error(response.EM)
            }
        } else {
            toast.error(`Delete post with id ${id} failed`)
        }
    }

    const handlePageClick = async (e) => {
        setCurrentPage(+e.selected + 1)
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    return (
        <div>
            <h3 className='text-center mt-3'>Manage Post</h3>
            <div className='container'>
                {isLoading ? <Loader loading={isLoading} /> :
                    <>
                        <table className="table table-striped table-bordered mt-3">
                            <thead className='table-header'>
                                <tr>
                                    <th scope="col">Tiêu đề Việt</th>
                                    <th scope="col">Tiêu đề Anh</th>
                                    <th scope="col">Người đăng</th>
                                    {/* <th scope="col">Ảnh tiêu đề</th> */}
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts && posts.length > 0 &&
                                    posts.map((item, index) => {
                                        return (
                                            <tr key={uuidv4()}>
                                                <td style={{ cursor: "pointer", color: "blue" }}>{item.titleVi} </td>
                                                <td style={{ cursor: "pointer", color: "blue" }}>{item.titleEn}</td>
                                                <td>{item.owner}</td>
                                                {/* <td><img className='w-25' src={item.image} alt="Ảnh bài đăng" /></td> */}
                                                <td className='w-100 d-flex justify-content-center'>
                                                    <span className='icon-action-edit'><FaPencil /></span>
                                                    <span onClick={() => handleDeletePost(item.id)} className='icon-action-delete ms-4' ><FaTrashAlt /></span>
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



export default ManagePosts