import React, { useEffect } from 'react';
import banner1 from '../../assets/img/banner1.png'
import banner2 from '../../assets/img/banner2.png'
import banner3 from '../../assets/img/banner3.png'

const Carousel = () => {
    useEffect(() => {
        // const carouselInterval = setInterval(() => {
        //     const btnNext = document.querySelector('.carousel-control-next')
        //     btnNext.click()

        // }, 3000); // Thời gian chuyển slide (3 giây)

        // return () => {
        //     // Xóa interval khi component unmount
        //     clearInterval(carouselInterval);
        // };
    }, []);

    return (
        <div className='banner-slide'>
            <div className='banner-carousel'>
                <div id="carouselExampleIndicators" className="carousel slide" >
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={banner1} className="d-block img-carousel" alt="banner 1" />
                        </div>
                        <div className="carousel-item">
                            <img src={banner2} className="d-block img-carousel" alt='banner2' />
                        </div>
                        <div className="carousel-item">
                            <img src={banner3} className="d-block img-carousel" alt="banner3" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;