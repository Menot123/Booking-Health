import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogDetail.scss'
import { FaHome, FaArrowUp } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import new_blog from '../../assets/img/new-blog.png'
import { getDataUpdatePost, fetchPostsByType, addPostViewCount } from '../../services/postService'
import NotFound from '../404_Not_Found/NotFound';
import { useParams, useHistory } from 'react-router-dom';
import detail_in_blog from '../../assets/img/detail-in-blog.png'
import popular_blog from '../../assets/img/popular-blog.png'
import handbook from '../../assets/img/handbook.png'
import { FormattedMessage } from 'react-intl'
import moment from 'moment';

function BlogDetail(props) {
    const [post, setPost] = useState([])
    const [isExistingPost, setIsExistingPost] = useState(false)
    const [postImg, setPostImg] = useState([])
    const [relevantPosts, setRelevantPosts] = useState('')
    const [postContent, setPostContent] = useState({
        catalogue: ``,
        detail: ``
    })
    const { id } = useParams();
    // Fetch posts
    useEffect(() => {
        getPostById()
    }, [])

    const getPostById = async () => {
        const data = {
            postId: id
        }
        let res = await getDataUpdatePost(data)
        if (res.EC === 0) {
            // setTimeout(, 60000)
            setTimeout(() => {
                addPostViewCount(id)
            }, 30000);

            setIsExistingPost(true)
            setPost(res.DT.post)
            setPostImg(convertBlob2Img(res.DT.post.titleImg))
            let relevantPosts = await fetchPostsByType(res.DT.post.type)
            // Lấy dữ liệu các post liên quan
            setRelevantPosts(relevantPosts.DT.post.slice(0, 6))
            // Chia catalogue và detail từ post.fullContent
            const splitHTML = res.DT.post.fullContent.split("<div class='catalogue'>");
            const catalogue = splitHTML[1].split('</div>')[0];
            const detail = splitHTML[1].split('</div>')[1];
            setPostContent({ catalogue, detail })
            // console.log(res.DT.post)
        }
        else {
            console.log("fail to get posts by id")
        }
    }
    const convertBlob2Img = (blob) => {
        let imageCloud = ''
        imageCloud = new Buffer(blob, 'base64').toString('binary')
        return imageCloud
    }
    const settings_relevant_blog = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    };
    function scrollToIdView(id) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    }
    return (
        <>
            {
                isExistingPost
                    ?
                    <>
                        {/* This is the Nav of the Blog */}
                        <div className='container' id='custom-blog-nav'>
                            {/* <FaHome onClick={() => props.handleNavigateToPage('/')} style={{ color: "blue", fontSize: "19", cursor: "pointer" }} /> */}
                            <IoMdHome onClick={() => props.handleNavigateToPage('/')} color="#45c3d2" fontSize="1.5em" />
                            <span onClick={() => props.handleNavigateToPage('/cam-nang')} style={{ fontSize: "17px", color: "#438b94", cursor: "pointer" }}> / <FormattedMessage id="blog.handbook" defaultMessage={'Cẩm nang'} /></span>
                            <span onClick={() => props.handleNavigateToPage('/cam-nang/danh-sach')} style={{ fontSize: "17px", color: "#438b94", cursor: "pointer" }}> / <FormattedMessage id="blog.handbook-list" defaultMessage={'Danh sách'} /></span>
                            <span onClick={() => props.handleNavigateToPage('/cam-nang/danh-sach/' + post.type)} style={{ fontSize: "17px", color: "#438b94", cursor: "pointer" }}> / {decodeURIComponent(post.type)}</span>
                        </div>

                        {/* This is Blog Body */}
                        <div className='container post-container'>
                            <div className='row '>
                                <div className="detail">
                                    {/* OffCanvas Table Content*/}
                                    <button className="btn btn-primary offcanvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><FormattedMessage id='blog.catalogue' defaultMessage={'Mục lục'} /></button>
                                    <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                                        <div className="offcanvas-header" style={{ borderBottom: '4px solid orange' }}>
                                            <h3 className="offcanvas-title" id="offcanvasScrollingLabel"><FormattedMessage id='blog.catalogue' defaultMessage={'Mục lục'} /></h3>
                                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body border-top-1">
                                            <div className="offcanvas-table-content">
                                                <ul className='list level1' dangerouslySetInnerHTML={{ __html: postContent.catalogue }} />

                                            </div>
                                        </div>
                                    </div>

                                    {/* Table Content show */}
                                    <div className="table-content">
                                        <h3 className='title'><FormattedMessage id='blog.catalogue' defaultMessage={'Mục lục'} /></h3>
                                        <ul className='list level1' dangerouslySetInnerHTML={{ __html: postContent.catalogue }} />
                                    </div>

                                    {/* Detail of content */}
                                    <div className='full-content'>
                                        {/* Image Title*/}
                                        <figure className='text-center'>
                                            <img alt='img-element' src={postImg} className='w-100' />
                                            <figcaption>{post.title}</figcaption>
                                        </figure>

                                        {/* Title */}
                                        <h1 className='title'>{post.title}</h1>

                                        {/* Blog Info */}
                                        <div className='more-info'>
                                            <span className='name-info'>Sản phẩm của:</span>
                                            <a href='/' className='main-info'>BookingHealth</a>
                                        </div>
                                        <div className='more-info'>
                                            <span className='name-info'>Người kiểm duyệt:</span>
                                            <a href='#' className='main-info'>{post.owner}</a>
                                        </div>
                                        <div className='more-info'>
                                            <span className='name-info'>Xuất bản:</span>
                                            <span className='main-info'>{moment(post.createdAt).format("HH:mm DD/MM/YYYY")} | Cập nhật lần cuối: {moment(post.updatedAt).format("HH:mm DD/MM/YYYY")}</span>
                                        </div>
                                        {/* Blog Title */}
                                        <h2 className='heading'>{post.description}</h2>
                                        <div className='pb-4' dangerouslySetInnerHTML={{ __html: postContent.detail }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Relevant */}
                        <div className='container slider-blog-content'>
                            <div className='title w-100 d-flex align-items-center justify-content-between border-bottom'>
                                <h4><FormattedMessage id='blog.relevant-blog' defaultMessage={'Bài viết liên quan'} /></h4>
                                <span onClick={() => props.handleNavigateToPage('/cam-nang/danh-sach/' + post.type)} className='btn btn-primary btn-view-more'><span className='text-btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} style={{ cursor: 'pointer' }} /></span> </span>
                            </div>
                            {
                                relevantPosts && relevantPosts.length > 0 &&
                                <Slider {...settings_relevant_blog}>
                                    {relevantPosts.map((post, index) => (
                                        <div key={index} className='wrapper-blog-item'>
                                            <div onClick={() => props.handleNavigateToPage('/cam-nang/' + post.id)} style={{ cursor: 'pointer' }} className='blog-item-relevant'>
                                                <div className='wrapper-img-blog'>
                                                    <img alt='img-element' className='img-blog' src={convertBlob2Img(post.titleImg)} />
                                                </div>
                                                <div className='items'>
                                                    <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                                        <h6 className='text-start blog-name-relevant'>{post.title}</h6>
                                                    </div>
                                                    <p className='ps-3 pe-3 mb-1 detail fw-light content'>{post.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Relevant Blog Card Example
                                    <div className='wrapper-blog-item'>
                                        <div className='blog-item-relevant'>
                                            <div className='wrapper-img-blog'>
                                                <img alt='img-element' className='img-blog' src={new_blog} />
                                            </div>
                                            <div className='items'>
                                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                                    <h6 className='text-start blog-name-relevant'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                                </div>
                                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                                            </div>
                                        </div>
                                    </div> */}
                                </Slider>
                            }
                        </div>

                        {/* Scroll to catalogue Button */}
                        <div className='fixed-bottom mb-4 me-5 text-end'>
                            <div onClick={() => scrollToIdView('custom-blog-nav')} className='scroll-to-catalogue-container' style={{ cursor: 'pointer' }}>
                                <FaArrowUp size={40} color='white' />
                            </div>
                        </div>
                    </>
                    : <NotFound />
            }
        </>
    )
}

export default BlogDetail