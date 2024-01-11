import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Blog.scss'
import new_blog from '../../assets/img/new-blog.png'
import popular_blog from '../../assets/img/popular-blog.png'
import handbook from '../../assets/img/handbook.png'
import { useHistory, Redirect, Navigate } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

function Blog() {
    let history = useHistory();
    const handleNavigateToPage = (path) => {
        history.push(path);
        // window.scrollTo(0, 0);
    };
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
    const setting_handbook = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 5, slidesToScroll: 1 } },
            { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
            { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    };

    return (
        <div className='container'>

            {/* New Post */}
            <div className='slider-blog-content'>
                <div className='title w-100 d-flex align-items-center justify-content-between border-bottom'>
                    <h4><FormattedMessage id='blog.new-blog' defaultMessage={'Bài viết mới nhất'} /></h4>
                </div>
                <Slider {...settings_new_blog}>
                    {/* Blog Card */}
                    <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div>
                    {/* Blog Card */}
                    <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card */}
                    <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card */}
                    <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card */}
                    <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card */}
                    <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card */}
                    <div className='wrapper-blog-item'>
                        <div className='blog-item'>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={new_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name'>
                                    <h6 className='text-start blog-name'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</p>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>

            {/* Popular Blog */}
            <div className='slider-blog-content'>
                <div className='title w-100 d-flex align-items-center justify-content-between border-bottom'>
                    <h4><FormattedMessage id='blog.popular-blog' defaultMessage={'Bài viết nổi bật'} /></h4>
                </div>
                <Slider {...settings_popular_blog}>
                    {/* Blog Card */}
                    <div className='wrapper-blog-item' >
                        <div className='blog-item' style={{ cursor: 'pointer' }}>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={popular_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name fs-5'>
                                    <h6 className='text-start blog-name'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content fs-6'>Test nhanh Covid-19 cho kết quả nhanh chóng, phù hợp với nhu cầu sàng lọc. Các địa chỉ test nhanh trong bài viết đều là địa chỉ uy tín, bạn đọc có thể tham khảo và lựa chọn địa chỉ test phù hợp.</p>
                            </div>
                        </div>
                    </div>

                    {/* Blog Card */}
                    <div className='wrapper-blog-item' >
                        <div className='blog-item' style={{ cursor: 'pointer' }}>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={popular_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name fs-5'>
                                    <h6 className='text-start blog-name'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content fs-6'>Test nhanh Covid-19 cho kết quả nhanh chóng, phù hợp với nhu cầu sàng lọc. Các địa chỉ test nhanh trong bài viết đều là địa chỉ uy tín, bạn đọc có thể tham khảo và lựa chọn địa chỉ test phù hợp.</p>
                            </div>
                        </div>
                    </div>
                    {/* Blog Card */}
                    <div className='wrapper-blog-item' >
                        <div className='blog-item' style={{ cursor: 'pointer' }}>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={popular_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name fs-5'>
                                    <h6 className='text-start blog-name'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content fs-6'>Test nhanh Covid-19 cho kết quả nhanh chóng, phù hợp với nhu cầu sàng lọc. Các địa chỉ test nhanh trong bài viết đều là địa chỉ uy tín, bạn đọc có thể tham khảo và lựa chọn địa chỉ test phù hợp.</p>
                            </div>
                        </div>
                    </div>
                    {/* Blog Card */}
                    <div className='wrapper-blog-item' >
                        <div className='blog-item' style={{ cursor: 'pointer' }}>
                            {/* Image Blog */}
                            <div className='wrapper-img-blog'>
                                <img alt='img-element' className='img-blog' src={popular_blog} />
                            </div>
                            {/* Blog Item: Title and Content */}
                            <div className='items'>
                                <div className='title ps-3 pe-3 mt-2 mb-0 blog-name fs-5'>
                                    <h6 className='text-start blog-name'>7 Địa chỉ xét nghiệm, test nhanh Covid-19 tốt tại TP.HCM</h6>
                                </div>
                                <p className='ps-3 pe-3 mb-1 detail fw-light content fs-6'>Test nhanh Covid-19 cho kết quả nhanh chóng, phù hợp với nhu cầu sàng lọc. Các địa chỉ test nhanh trong bài viết đều là địa chỉ uy tín, bạn đọc có thể tham khảo và lựa chọn địa chỉ test phù hợp.</p>
                            </div>
                        </div>
                    </div>

                </Slider>
            </div>

            <div className='slider-blog-content'>
                {/* Handbook */}
                <div className='title w-100 d-flex align-items-center justify-content-between border-bottom'>
                    <h4><FormattedMessage id='blog.handbook' defaultMessage={'Bài viết nổi bật'} /></h4>
                    {/* <Redirect class="btn btn-primary btn-view-more text-btn-view-more" to="/danh-sach">
                        Xem thêm
                    </Redirect> */}
                    <span className='btn btn-primary btn-view-more text-btn-view-more' onClick={() => handleNavigateToPage("/cam-nang/danh-sach")}>
                        <FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} />
                    </span>
                </div>
                <Slider {...setting_handbook}>
                    {/* Hanbook Card */}
                    <div className='wrapper-handbook-item' >
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="handbook-item">
                                    <img alt='img-element' src={handbook} className='handbook-img' />
                                    <div className="content-handbook"> Cơ xương khớp </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Hanbook Card */}
                    <div className='wrapper-handbook-item' >
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="handbook-item">
                                    <img alt='img-element' src={handbook} className='handbook-img' />
                                    <div className="content-handbook"> Cơ xương khớp </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Hanbook Card */}
                    <div className='wrapper-handbook-item' >
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="handbook-item">
                                    <img alt='img-element' src={handbook} className='handbook-img' />
                                    <div className="content-handbook"> Cơ xương khớp </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Hanbook Card */}
                    <div className='wrapper-handbook-item' >
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="handbook-item">
                                    <img alt='img-element' src={handbook} className='handbook-img' />
                                    <div className="content-handbook"> Cơ xương khớp </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Hanbook Card */}
                    <div className='wrapper-handbook-item' >
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="handbook-item">
                                    <img alt='img-element' src={handbook} className='handbook-img' />
                                    <div className="content-handbook"> Cơ xương khớp </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Hanbook Card */}
                    <div className='wrapper-handbook-item' >
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="handbook-item">
                                    <img alt='img-element' src={handbook} className='handbook-img' />
                                    <div className="content-handbook"> Cơ xương khớp </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </Slider>
            </div>
        </div>
    )
}

export default Blog