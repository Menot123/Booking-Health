import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './ManagePosts.scss'
import 'react-image-lightbox/style.css';
import { fetchAllPost, createPost, getDataUpdatePost, updatePost, deletePost } from '../../../services/postService'
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
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import moment from 'moment';

const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

function ManagePosts() {

    // Markdown Editor
    const [value, setValue] = useState('');
    const handleEditorChange = ({ text }) => {
        setPostData((prevData) => ({
            ...prevData,
            fullContent: text,
        }));
    };

    const currentLang = useSelector(state => state.userRedux.language)

    const [isLoading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [gender, setGender] = useState([])
    const [role, setRole] = useState([])
    const [position, setPosition] = useState([])
    const [postImg, setPostImg] = useState('')
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
        type: '',
        title: '',
        titleImg: '',
        description: '',
        fullContent: '',
    }

    const [postData, setPostData] = useState(defaultPostData);

    const validateData = ['owner', 'type', 'title', 'titleImg', 'description', 'fullContent']

    const [isUpdate, setIsUpdate] = useState(false)
    const [updateId, setUpdateId] = useState(0);
    const [isCreate, setIsCreate] = useState(false)
    const [isViewMode, setIsViewMode] = useState(true);

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
            console.log(imgBase64)
            setPostImg(imgBase64)
            setPostData(prevData => ({
                ...prevData,
                postImg: imgBase64
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
        setPostData(prevData => ({
            ...prevData,
            [element]: event.target.value
        }));
    }

    const openCreatePostAction = () => {
        setImgPreview({
            isOpen: false,
            imgReviewUrl: ''
        });
        setPostData(defaultPostData);
        setIsCreate(true)
        setIsViewMode(false)
    }

    const closeCreatePostAction = () => {
        setIsCreate(false)
        setIsViewMode(true)
    }

    const stopEditor = () => {
        setIsUpdate(false)
        setIsViewMode(true)
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

    const handleCreatePost = async () => {
        let post = {
            owner: postData.owner,
            type: postData.type,
            title: postData.title,
            titleImg: postImg,
            description: postData.description,
            fullContent: postData.fullContent
        }
        let validateArr = validateDataSend(post)
        if (validateArr.length === 0) {
            let response = await createPost(post)
            console.log(response)
            if (response.EC === 0) {
                toast.success(`Create new post successfully`)
                setPostData(defaultPostData)
                setImgPreview(prevState => ({
                    ...prevState,
                    imgReviewUrl: ''
                }));
                getPostsWithPagination()
                setIsUpdate(false)
                setIsViewMode(true)
            } else {
                toast.error(response.EM)
            }
        } else {
            const missingFieldsString = validateArr.join(', ');
            toast.error('Missing fields: ' + missingFieldsString + ', please fill them!');
        }
    }

    const handleGetDataEditPost = async (id) => {
        setIsUpdate(true)
        setUpdateId(id)
        setIsViewMode(false)
        if (id) {
            let postUpdate = { postId: id }
            let response = await getDataUpdatePost(postUpdate)
            // console.log(response)
            if (response.EC === 0) {
                let postData = {
                    owner: response.DT.post.owner,
                    type: response.DT.post.type,
                    title: response.DT.post.title,
                    titleImg: response.DT.post.titleImg,
                    description: response.DT.post.description,
                    fullContent: response.DT.post.fullContent
                }
                let imgReview = convertImgBase64(postData.titleImg)
                console.log(imgReview)
                setPostImg(imgReview)
                setPostData(postData)
                setImgPreview(prevState => ({
                    ...prevState,
                    imgReviewUrl: imgReview
                }));
            } else {
                toast.error(response.EM)
            }
        } else {
            toast.error(`View post with id ${id} failed`)
        }
    }
    const handleUpdatePost = async () => {
        let post = {
            owner: postData.owner,
            type: postData.type,
            title: postData.title,
            titleImg: postImg,
            description: postData.description,
            fullContent: postData.fullContent
        }
        let validateArr = validateDataSend(post)
        if (validateArr.length === 0) {
            let response = await updatePost(updateId, post)
            console.log(response)
            if (response.EC === 0) {
                toast.success(`Update post with id ${updateId} successfully`)
                setPostData(defaultPostData)
                setImgPreview(prevState => ({
                    ...prevState,
                    imgReviewUrl: ''
                }));
                getPostsWithPagination()
                setIsUpdate(false)
                setIsViewMode(true)
            } else {
                toast.error(response.EM)
            }
        } else {
            const missingFieldsString = validateArr.join(', ');
            toast.error('Missing fields: ' + missingFieldsString + ', please fill them!');
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


    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    return (
        <div>
            <h3 className='text-center mt-3'><FormattedMessage id='admin-blog-manage' /></h3>
            <div className='container'>
                {isLoading ? <Loader loading={isLoading} /> :
                    <>
                        {/* View Posts */}
                        {isViewMode ? (
                            <>
                                <button onClick={() => openCreatePostAction()} className={'btn btn-primary'}><FormattedMessage id='admin-blog-create' /></button>
                                <table className="table table-striped table-bordered mt-3">
                                    <thead className='table-header'>
                                        <tr>
                                            <th scope="col"><FormattedMessage id='admin-blog-title' /></th>
                                            <th scope="col"><FormattedMessage id='admin-blog-type' /></th>
                                            <th scope="col"><FormattedMessage id='admin-blog-owner' /></th>
                                            <th scope="col"><FormattedMessage id='admin-blog-created-at' /></th>
                                            <th scope="col"><FormattedMessage id='admin-blog-updated-at' /></th>
                                            {/* <th scope="col">Ảnh tiêu đề</th> */}
                                            <th scope="col"><FormattedMessage id='admin-blog-action' /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts && posts.length > 0 &&
                                            posts.map((item, index) => {
                                                const formattedCreatedAt = moment(item.createdAt).format("HH:mm DD/MM/YYYY");
                                                const formattedUpdatedAt = moment(item.updatedAt).format("HH:mm DD/MM/YYYY");
                                                return (
                                                    <tr key={uuidv4()}>
                                                        <td style={{ cursor: "pointer", color: "blue" }}>{item.title} </td>
                                                        <td>{item.type}</td>
                                                        <td>{item.owner}</td>
                                                        <td>{formattedCreatedAt}</td>
                                                        <td>{formattedUpdatedAt}</td>
                                                        {/* <td><img className='w-25' src={item.image} alt="Ảnh bài đăng" /></td> */}
                                                        <td className='w-100 d-flex justify-content-center'>
                                                            <span onClick={() => handleGetDataEditPost(item.id)} className='icon-action-edit'><FaPencil /></span>
                                                            <span onClick={() => handleDeletePost(item.id)} className='icon-action-delete ms-4' ><FaTrashAlt /></span>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            // Create and Update Form
                            <>
                                <div className='title-form my-3'>
                                    {isUpdate
                                        ? <h6><FormattedMessage id='admin-blog-update' /></h6>
                                        : <h6><FormattedMessage id='admin-blog-create' /></h6>
                                    }
                                </div>
                                <div className='btn-back'>
                                    {isUpdate
                                        ? <button onClick={() => stopEditor()} className={'btn btn-secondary'}><FormattedMessage id='admin-blog-back' /></button>
                                        : <button onClick={() => closeCreatePostAction()} className={'btn btn-secondary'}><FormattedMessage id='admin-blog-back' /></button>
                                    }
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label htmlFor='input-owner'><FormattedMessage id='admin-blog-owner' /></label>
                                        <input value={postData.owner} onChange={(e) => handleOnchangeInput(e, 'owner')} className='form-control' id='input-owner' type='text' />
                                    </div>

                                    <div className='col-6'>
                                        <label htmlFor='input-type'><FormattedMessage id='admin-blog-type' /></label>
                                        <input type='text' value={postData.type} onChange={(e) => handleOnchangeInput(e, 'type')} className='form-control' id='input-type' />
                                    </div>

                                    <div className='col-12 my-2'>
                                        <label htmlFor='input-title'><FormattedMessage id='admin-blog-title' /></label>
                                        <input value={postData.title} onChange={(e) => handleOnchangeInput(e, 'title')} className='form-control' id='input-title' type='text' />
                                    </div>

                                    <div className='col-6 my-2'>
                                        <label><FormattedMessage id='admin-blog-title-img' /></label>
                                        <div className='preview-img-wrapper'>
                                            <input hidden id="img-upload" type='file'
                                                onChange={(e) => handleChangeImage(e)}
                                            />
                                            <label className='label-upload' htmlFor="img-upload"><FormattedMessage id='admin-blog-upload-img' /><FaUpload className='ms-1 mb-1' /></label>
                                            <div className='preview-image'
                                                style={{ backgroundImage: `url(${imgPreview.imgReviewUrl})` }}
                                                onClick={() => openPreviewImage()}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className='col-6 my-2'>
                                        <label htmlFor='input-description'><FormattedMessage id='admin-blog-description' /></label>
                                        <textarea value={postData.description} onChange={(e) => handleOnchangeInput(e, 'description')}
                                            className='form-control' id='input-description' type='text' rows="3"></textarea>
                                    </div>


                                    <div className='col-12'>
                                        <label htmlFor='input-full-content'><FormattedMessage id='admin-blog-full-content' /></label>
                                        <div className="editor-pane">
                                            <MdEditor
                                                style={{ height: '400px' }}
                                                id='input-full-content'
                                                value={postData.fullContent}
                                                renderHTML={(text) => mdParser.render(text)}
                                                onChange={handleEditorChange}
                                                onImageUpload={getBase64}
                                            />
                                        </div>
                                        {/* <div className="preview-pan">
                                            <div dangerouslySetInnerHTML={{ __html: mdParser.render(postData.fullContent) }} />
                                        </div> */}
                                    </div>
                                </div>
                                {isUpdate
                                    ? <button onClick={() => handleUpdatePost()} className={'btn btn-primary'}><FormattedMessage id='admin-blog-save-update' /></button>
                                    : <button onClick={() => handleCreatePost()} className={'btn btn-primary'}><FormattedMessage id='admin-blog-save-create' /></button>
                                }
                            </>
                        )}

                        {totalPage > 0 &&
                            <ReactPaginate
                                className={isViewMode ? '' : 'd-none'}
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
                    </>

                }
            </div>

        </div>
    )
}



export default ManagePosts