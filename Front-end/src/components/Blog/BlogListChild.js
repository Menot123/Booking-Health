import React, { useEffect } from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogListChild.scss'
import blog_item from '../../assets/img/blog-list-child-item.png'
import { FormattedMessage } from 'react-intl'
import { FaSearch } from "react-icons/fa";


function BlogListChild() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='container-bloglist-detail'>
            <div className='container '>
                {/* Search Box */}
                <div className='search-box'>
                    <input type="text" className="input-search form-control" placeholder="Tìm kiếm" />
                    <span className="icon-search"><FaSearch /></span>
                </div>

                {/* Blog Item (Loop)*/}
                <a href="#">
                    <div className='blog-card'>
                        <div className='row'>
                            <div className='img-card'>
                                <img src={blog_item} alt="Blog Item" />
                            </div>
                            <div className='text-card col'>
                                <div className='title col-md-12'><h5>Nội soi dạ dày ở TP.HCM bao nhiêu tiền?</h5></div>
                                <div className='content col-md-12'><p>Nội soi dạ dày là phương pháp hiệu quả trong khám và phát hiện bệnh dạ dày. Nhiều bệnh nhân đặt câu hỏi nội soi dạ dày bao nhiêu tiền để có thể chuẩn bị chi phí khi đi khám. BookingHealth xin giải đáp trong bài viết này.</p></div>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className='blog-card'>
                        <div className='row'>
                            <div className='img-card'>
                                <img src={blog_item} alt="Blog Item" />
                            </div>
                            <div className='text-card col'>
                                <div className='title col-md-12'><h5>Nội soi dạ dày ở TP.HCM bao nhiêu tiền?</h5></div>
                                <div className='content col-md-12'><p>Nội soi dạ dày là phương pháp hiệu quả trong khám và phát hiện bệnh dạ dày. Nhiều bệnh nhân đặt câu hỏi nội soi dạ dày bao nhiêu tiền để có thể chuẩn bị chi phí khi đi khám. BookingHealth xin giải đáp trong bài viết này.</p></div>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className='blog-card'>
                        <div className='row'>
                            <div className='img-card'>
                                <img src={blog_item} alt="Blog Item" />
                            </div>
                            <div className='text-card col'>
                                <div className='title col-md-12'><h5>Nội soi dạ dày ở TP.HCM bao nhiêu tiền?</h5></div>
                                <div className='content col-md-12'><p>Nội soi dạ dày là phương pháp hiệu quả trong khám và phát hiện bệnh dạ dày. Nhiều bệnh nhân đặt câu hỏi nội soi dạ dày bao nhiêu tiền để có thể chuẩn bị chi phí khi đi khám. BookingHealth xin giải đáp trong bài viết này.</p></div>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className='blog-card'>
                        <div className='row'>
                            <div className='img-card'>
                                <img src={blog_item} alt="Blog Item" />
                            </div>
                            <div className='text-card col'>
                                <div className='title col-md-12'><h5>Nội soi dạ dày ở TP.HCM bao nhiêu tiền?</h5></div>
                                <div className='content col-md-12'><p>Nội soi dạ dày là phương pháp hiệu quả trong khám và phát hiện bệnh dạ dày. Nhiều bệnh nhân đặt câu hỏi nội soi dạ dày bao nhiêu tiền để có thể chuẩn bị chi phí khi đi khám. BookingHealth xin giải đáp trong bài viết này.</p></div>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className='blog-card'>
                        <div className='row'>
                            <div className='img-card'>
                                <img src={blog_item} alt="Blog Item" />
                            </div>
                            <div className='text-card col'>
                                <div className='title col-md-12'><h5>Nội soi dạ dày ở TP.HCM bao nhiêu tiền?</h5></div>
                                <div className='content col-md-12'><p>Nội soi dạ dày là phương pháp hiệu quả trong khám và phát hiện bệnh dạ dày. Nhiều bệnh nhân đặt câu hỏi nội soi dạ dày bao nhiêu tiền để có thể chuẩn bị chi phí khi đi khám. BookingHealth xin giải đáp trong bài viết này.</p></div>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="#">
                    <div className='blog-card'>
                        <div className='row'>
                            <div className='img-card'>
                                <img src={blog_item} alt="Blog Item" />
                            </div>
                            <div className='text-card col'>
                                <div className='title col-md-12'><h5>Nội soi dạ dày ở TP.HCM bao nhiêu tiền?</h5></div>
                                <div className='content col-md-12'><p>Nội soi dạ dày là phương pháp hiệu quả trong khám và phát hiện bệnh dạ dày. Nhiều bệnh nhân đặt câu hỏi nội soi dạ dày bao nhiêu tiền để có thể chuẩn bị chi phí khi đi khám. BookingHealth xin giải đáp trong bài viết này.</p></div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>


        </div >
    )
}

export default BlogListChild