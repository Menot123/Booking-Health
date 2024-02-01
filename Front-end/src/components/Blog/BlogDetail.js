import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogDetail.scss'
import new_blog from '../../assets/img/new-blog.png'
import detail_in_blog from '../../assets/img/detail-in-blog.png'
import popular_blog from '../../assets/img/popular-blog.png'
import handbook from '../../assets/img/handbook.png'
import { FormattedMessage } from 'react-intl'

function BlogDetail() {
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

    let catalogue = `<li><a href="#section1" >Xét nghiệm NIPT có những ưu điểm gì?</a></li>
    <li><a href="#section2">Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</a>
    <!-- Write your comments here -->
        <ol className='level2'>
            <li><a href="#subsection2.1">Phòng xét nghiệm Y khoa C- STAR Vũng Tàu</a></li>
            <li><a href="#subsection2.2">Phòng khám chuyên khoa xét nghiệm MEDLATEC Vũng Tàu</a></li>
            <li><a href="#subsection2.3">Trung tâm xét nghiệm Gentis</a></li>
        </ol>
    </li>`;
    return (
        <div className='container post-container'>
            <div className='row '>
                <div className="detail">
                    {/* OffCanvas Table Content*/}
                    <button className="btn btn-primary offcanvas-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><FormattedMessage id='blog.catalogue' defaultMessage={'Mục lục'} /></button>
                    <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header" style={{ borderBottom: '4px solid orange' }}>
                            <h3 className="offcanvas-title" id="offcanvasScrollingLabel"><FormattedMessage id='blog.catalogue' defaultMessage={'Mục lục'} /></h3>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body border-top-1">
                            <div className="offcanvas-table-content">
                                <ul className='list level1' dangerouslySetInnerHTML={{ __html: catalogue }} />

                            </div>
                        </div>
                    </div>

                    {/* Table Content show */}
                    <div className="table-content">
                        <h3 className='title'><FormattedMessage id='blog.catalogue' defaultMessage={'Mục lục'} /></h3>
                        <ul className='list level1' dangerouslySetInnerHTML={{ __html: catalogue }} />
                    </div>

                    {/* Detail of content */}
                    <div className='full-content'>
                        {/* Image Title*/}
                        <figure className='text-center'>
                            <img alt='img-element' src={new_blog} className='w-100' />
                            <figcaption>Top 3 địa chỉ xét nghiệm NIPT Vũng Tàu</figcaption>
                        </figure>

                        {/* Title */}
                        <h1 className='title'>Gợi ý Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h1>

                        {/* Blog Info */}
                        <div className='more-info'>
                            <span className='name-info'>Sản phẩm của:</span>
                            <a href='/' className='main-info'>BookingHealth</a>
                        </div>
                        <div className='more-info'>
                            <span className='name-info'>Người kiểm duyệt:</span>
                            <a href='#' className='main-info'>Nguyễn Văn A</a>
                        </div>
                        <div className='more-info'>
                            <span className='name-info'>Xuất bản:</span>
                            <span className='main-info'>03/01/2024 | Cập nhật lần cuối: 03/01/2024</span>
                        </div>
                        {/* Blog Title */}
                        <h2 className='heading'>Tại Vũng Tàu, mẹ bầu nên đi xét nghiệm NIPT tại đâu để có kết quả nhanh chóng, chính xác? Tham khảo ngay bài viết dưới đây để biết thêm thông tin.</h2>
                        <p className='text-content'>Xét nghiệm NIPT hiện nay là một trong những thủ thuật sàng lọc trước sinh được các mẹ bầu quan tâm và vô cùng cẩn trọng khi tìm hiểu. Tại Vũng Tàu, địa chỉ nào sàng lọc NIPT nhanh chóng, chính xác?</p>
                        <p className='text-content'>Trong bài viết dưới đây, chúng tôi đã tìm hiểu, tổng hợp thông tin 3 địa chỉ xét nghiệm NIPT Vũng Tàu được nhiều gia đình tin tưởng, bạn đọc có thể tham khảo và lựa chọn địa chỉ phù hợp. </p>

                        {/* Blog Section 1 */}
                        <h2 id="section1" className='heading'>Xét nghiệm NIPT có những ưu điểm gì?</h2>
                        <p className='text-content'>NIPT (Xét nghiệm tiền sản không xâm lấn) là phương pháp sàng lọc sử dụng DNA trong máu của mẹ bầu để đánh giá, theo dõi quá trình phát triển của thai nhi và phát hiện các bệnh di truyền bất thường.</p>
                        <p className='text-content'>Phương pháp NIPT mang lại nhiều ưu điểm vượt trội, giúp cung cấp thông tin chính xác về nguy cơ các tình trạng gen không bình thường của thai nhi mà không đòi hỏi phải can thiệp vào tử cung của người mẹ</p>
                        <ul className='list'>
                            <li className='text-content'><span className='text-bold'>Non-Invasive (Không xâm lấn):</span> Một trong những ưu điểm chính của NIPT là không cần phải chọc dò vào tử cung như các phương pháp xét nghiệm truyền thống khác. Bằng cách lấy một mẫu máu nhỏ từ người mẹ, qua quá trình phân tích, đánh giá sẽ giúp phát hiện các dấu hiệu bất thường trên các nhiễm sắc thể của thai nhi.</li>
                            <li className='text-content'><span className='text-bold'>Tỉ lệ chính xác cao:</span> NIPT thường có tỷ lệ chính xác cao trong việc phát hiện các tình trạng gen không bình thường, đặc biệt là các trisomies như trisomy 21 (gây ra hội chứng Down), trisomy 18 (gây ra hội chứng Edwards), và trisomy 13 (gây ra hội chứng Patau).</li>
                            <li className='text-content'><span className='text-bold'>Nhanh chóng, chính xác:</span> Kết quả của NIPT thường được cung cấp nhanh chóng, giúp bác sĩ tư vấn kịp thời và mẹ bầu cũng có thêm thời gian lên kế hoạch nếu cần thiết.</li>
                            <li className='text-content'><span className='text-bold'>Tiện ích cho nhóm nguy cơ cao:</span> Đối với những người mang thai có nguy cơ cao về các tình trạng gen không bình thường, NIPT có thể cung cấp thông tin quan trọng để quyết định liệu pháp tiếp theo và quản lý thai kỳ.</li>
                        </ul>
                        <p className='text-content'>Để thực hiện an toàn phương pháp này và nhận kết quả chính xác, tư vấn cần thiết, mẹ bầu cần tìm kiếm các bệnh viện, phòng khám hay trung tâm xét nghiệm uy tín có dịch vụ xét nghiệm NIPT chất lượng.</p>

                        {/* Blog Section 2 */}
                        <h2 id="section2" className='heading'>Top 3 địa chỉ xét nghiệm NIPT tại Vũng Tàu</h2>
                        <p className='text-content'>Chúng tôi đã tìm hiểu và tổng hợp thông tin các địa chỉ xét nghiệm NIPT uy tín tại Vũng Tàu dựa trên các tiêu chí như hệ thống xét nghiệm hiện đại, thời gian trả kết quả nhanh chóng, có thực hiện lấy mẫu tại nhà,... bạn đọc cùng tham khảo.</p>

                        {/* Blog Section 2.1 */}
                        <h3 id='subsection2.1' className='subsection'>1. Phòng xét nghiệm Y khoa C- STAR Vũng Tàu</h3>
                        <ul className='list'>
                            <li className='text-content'>Địa chỉ: 99A Đường 3/2, Phường 8, Thành phố Vũng Tàu, Bà Rịa - Vũng Tàu</li>
                            <li className='text-content'>Giờ làm việc: Cả tuần
                                <ul>
                                    <li className='text-content'>Thứ 2 - thứ 7: Sáng: 06h00 - 11h00; Chiều: 14h00 - 18h00</li>
                                    <li className='text-content'>Chủ nhật: Sáng: 06h00 - 12h00; Chiều: Nghỉ</li>
                                </ul>
                            </li>
                        </ul>
                        <p className='text-content'>Phòng xét nghiệm Y khoa C- Star là địa chỉ xét nghiệm NIPT có tiếng tại Vũng Tàu được nhiều mẹ bầu tin tưởng. Tuy mới đi vào hoạt động từ năm 2021 nhưng C- Star đã đem lại sự hài lòng, tin tưởng cho khách hàng bởi đội ngũ kỹ thuật viên chuyên nghiệp và hệ thông xét nghiệm hiện đại, mang đến kết quả nhanh, chính xác.</p>

                        <figure className='text-center'>
                            <img alt='img-element' src={detail_in_blog} className=' text-content w-100' />
                            <figcaption>Phòng xét nghiệm Y khoa C-star được nhiều mẹ bầu tin tưởng thực hiện xét nghiệm NIPT - Ảnh: cstarlabs.vn</figcaption>
                        </figure>

                        <h2 className='subsection'>Ưu điểm tại Phòng xét nghiệm Y khoa C- Star</h2>
                        <ul className='list'>
                            <li className='text-content'>Sở hữu đội ngũ kỹ thuật viên y khoa chuyên môn tốt, thái độ làm việc chuyên nghiệp</li>
                            <li className='text-content'>Thực hiện đa dạng các dịch vụ như xét nghiệm máu tổng quát, xét nghiệm ADN huyết thống, NIPT thai sản, tiền hôn nhân, vi chất dinh dưỡng trẻ em, xét nghiệm ký sinh trùng</li>
                            <li className='text-content'>Hệ thống thiết bị xét nghiệm tự động, hiện đại, công nghệ tiên tiến từ các hãng danh tiếng trên thế giới như: Beckman Coulter (Mỹ), Roche (Thụy Sĩ), Sysmex (Nhật Bản),… </li>
                            <li className='text-content'>Phòng xét nghiệm tuân thủ thủ chặt chẽ quy trình xét nghiệm theo tiêu chí 2429- BYT, hướng đến tiêu chuẩn ISO 15189, cũng như chủ động nội kiểm tự động và ngoại kiểm kết quả xét nghiệm tại Trung tâm Kiểm chuẩn Chất lượng Xét nghiệm Y học (Đại học Y Dược Hồ Chí Minh).</li>
                            <li className='text-content'>Có thực hiện lấy mẫu tận nhà, miễn phí nội thành Vũng Tàu.</li>
                            <li className='text-content'>Kết quả trả trực tiếp/zalo OA....</li>
                        </ul>

                        <h2 className='subsection'>Chi phí xét nghiệm NIPT</h2>
                        <p className='text-content'>Bảng giá các dịch vụ xét nghiệm luôn được Phòng xét nghiệm C-Star công bố minh bạch tại website, bao gồm chi phí gói dịch vụ và các dịch vụ riêng lẻ, khách hàng có thể dễ dàng tham khảo.</p>
                        <p className='text-content'>Về chi phí xét nghiệm NIPT tại C- Star, bạn đọc có thể tìm hiểu ngay tại đây:</p>
                        <ul className='list'>
                            <li className='text-content'>NIPT-precare basic: 2.000.000 đồng (Giá khuyến mại: 1.650.000 đồng, áp dụng đến 30/4/2024)</li>
                            <li className='text-content'>NIPT-precare 7: 2.750.000 đồng</li>
                            <li className='text-content'>NIPT - precare 7 + BLM10: 3.400.000 đồng</li>
                        </ul>

                        <h2 className='subsection'>Review của khách hàng</h2>
                        <p className='text-content'>Phòng xét nghiệm Y khoa C - Star nhận được nhiều phản hồi tốt từ khách hàng tại Bà Rịa - Vũng Tàu vì dịch vụ nhanh chóng, kỹ thuật viên làm việc tận tình, có chuyên môn. Các mẹ bầu cũng đánh giá cao với dịch vụ lấy mẫu xét nghiệm tại nhà, trả kết quả online, có thể giảm bớt thời gian di chuyển, thuận tiện hơn cho khách hàng. </p>
                        {/* Blog Section 2.2 */}
                        <h3 id='subsection2.2' className='subsection'>2. Phòng khám chuyên khoa xét nghiệm MEDLATEC Vũng Tàu</h3>
                        {/* Blog Section 2.3 */}
                        <h3 id='subsection2.3' className='subsection'>3. Trung tâm xét nghiệm Gentis </h3>
                    </div>
                </div>
            </div>


            {/* Relevant */}
            <div className='slider-blog-content'>
                <div className='title w-100 d-flex align-items-center justify-content-between border-bottom'>
                    <h4><FormattedMessage id='blog.relevant-blog' defaultMessage={'Bài viết liên quan'} /></h4>
                    <span className='btn btn-primary btn-view-more'><span className='text-btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} style={{ cursor: 'pointer' }} /></span> </span>
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
        </div>
    )
}

export default BlogDetail