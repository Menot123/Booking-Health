import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Blog.scss'
import new_blog from '../../assets/img/new-blog.png'
import popular_blog from '../../assets/img/popular-blog.png'
import handbook from '../../assets/img/handbook.png'
import { FaHome } from "react-icons/fa";
import { fetchAllPostWithoutPage, getDataUpdatePost, fetchPostsByPopular } from '../../services/postService'
import { FormattedMessage } from 'react-intl'

function Blog(props) {
    const [newPosts, setNewPosts] = useState([])
    const [popularPosts, setPopularPosts] = useState([])
    const [types, setTypes] = useState({})
    // Fetch posts
    useEffect(() => {
        getNewPosts()
    }, [])

    useEffect(() => {
        getPopularPosts()
    }, [])

    const getNewPosts = async () => {
        let res = await fetchAllPostWithoutPage()
        if (res.EC === 0 && res.DT.length > 0) {
            // console.log(res.DT.slice(0, 6))
            setNewPosts(res.DT.slice(0, 6))
        }
        else {
            console.log("fail to get new posts")
        }
    }
    const getPopularPosts = async () => {
        let res = await fetchPostsByPopular()
        if (res.EC === 0 && res.DT.length > 0) {
            // console.log(res.DT.slice(0, 6))
            // console.log(res.DT)
            setPopularPosts(res.DT.slice(0, 5))
        }
        else {
            console.log("fail to get popular posts")
        }
    }
    const convertBlob2Img = (blob) => {
        let imageCloud = ''
        imageCloud = new Buffer(blob, 'base64').toString('binary')
        return imageCloud
    }
    const settings_new_blog = {
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
    const settings_popular_blog = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    };

    return (
        <div className='container'>
            {/* New Post */}
            <div className='slider-blog-content'>
                <div className='title w-100 d-flex align-items-center justify-content-between border-bottom'>
                    <h4><FormattedMessage id='blog.new-blog' defaultMessage={'Bài viết mới nhất'} /></h4>
                </div>
                {
                    newPosts && newPosts.length > 0 &&
                    <Slider {...settings_new_blog}>
                        {newPosts.map((post, index) => (
                            // <div>hahaha</div>
                            <div key={index} className='wrapper-blog-item'>
                                <div onClick={() => props.handleNavigateToPage('/cam-nang/' + post.id)} className='blog-item' style={{ cursor: 'pointer' }}>
                                    {/* Image Blog */}
                                    <div className='wrapper-img-blog'>
                                        <img alt='img-element' className='img-blog' src={convertBlob2Img(post.titleImg)} />
                                    </div>
                                    {/* Blog Item: Title and Content */}
                                    <div className='items-new'>
                                        <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                            <h6 className='text-start blog-name'>{post.title}</h6>
                                        </div>
                                        <p className='ps-3 pe-3 mb-1 detail fw-light content'>{post.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* This is New Blog Card */}
                        {/* <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            <div className='items-new'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div> */}
                    </Slider>
                }
            </div>

            {/* Popular Blog */}
            <div className='slider-blog-content'>
                <div className='title w-100 d-flex align-items-center justify-content-between border-bottom'>
                    <h4><FormattedMessage id='blog.popular-blog' defaultMessage={'Bài viết nổi bật'} /></h4>
                </div>
                {
                    popularPosts && popularPosts.length > 0 &&
                    <Slider {...settings_popular_blog}>
                        {popularPosts.map((post, index) => (
                            <div key={index} className='wrapper-blog-item' >
                                <div onClick={() => props.handleNavigateToPage('/cam-nang/' + post.id)} className='blog-item' style={{ cursor: 'pointer' }}>
                                    {/* Image Blog */}
                                    <div className='wrapper-img-blog'>
                                        <img alt='img-element' className='img-blog' src={convertBlob2Img(post.titleImg)} />
                                    </div>
                                    {/* Blog Item: Title and Content */}
                                    <div className='items-relevant'>
                                        <div className='title ps-3 pe-3 mt-2 mb-0 blog-name fs-5'>
                                            <h6 className='text-start blog-name'>{post.title}</h6>
                                        </div>
                                        <p className='ps-3 pe-3 mb-1 detail fw-light content fs-6'>{post.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* This is popular Blog Card */}
                        {/* <div className='wrapper-blog-item' >
                        <div className='blog-item' style={{ cursor: 'pointer' }}>
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={popular_blog} />
                            </div>
                            <div className='items-relevant'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name fs-5'>
                                    <h6 className='text-start blog-name'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content fs-6'>Test nhanh Covid-19 cho kết quả nhanh chóng, phù hợp với nhu cầu sàng lọc. Các địa chỉ test nhanh trong bài viết đều là địa chỉ uy tín, bạn đọc có thể tham khảo và lựa chọn địa chỉ test phù hợp.</p>
                            </div>
                        </div>
                    </div> */}

                    </Slider>
                }
            </div>

            <div className='slider-blog-content'>
                {/* Handbook */}
                <div className='w-100 d-flex align-items-center justify-content-center'>
                    <span key={'btn-view-more-blog'} className='btn btn-info btn-lg text-light fw-bold' onClick={() => props.handleNavigateToPage("/cam-nang/danh-sach")}>
                        <FormattedMessage id='blog.view-more' defaultMessage={'> Xem thêm các bài viết khác tại đây <'} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Blog