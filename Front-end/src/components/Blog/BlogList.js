import React from 'react';
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogList.scss'
import { useHistory } from "react-router-dom";
import { FormattedMessage } from 'react-intl'
import { useEffect } from 'react'

const BlogList = (props) => {
  let history = useHistory();
  const handleNavigateToPage = (path) => {
    history.push(path);
    props.scrollToTop()
  };
  return (
    <div className='container-bloglist'>
      <div className='container'>
        <div className='search-title border-bottom'>
          <h3> <FormattedMessage id='blog.search-by-char' defaultMessage={'Tìm kiếm theo chữ cái'} /></h3>
        </div>
        <div className='search-dialog'>
          <div className='row'>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <a href='#mucluc.a' className='col item-selected'>A</a>
                <a href='#mucluc.b' className='col item'>B</a>
                <a href='#mucluc.c' className='col item'>C</a>
                <a href='#mucluc.d' className='col item'>D</a>
                <a href='#mucluc.e' className='col item'>E</a>
                <a href='#mucluc.f' className='col item'>F</a>
                <a href='#mucluc.g' className='col item'>G</a>
              </div>

            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <a href='#mucluc.h' className='col item'>H</a>
                <a href='#mucluc.i' className='col item'>I</a>
                <a href='#mucluc.j' className='col item'>J</a>
                <a href='#mucluc.k' className='col item'>K</a>
                <a href='#mucluc.l' className='col item'>L</a>
                <a href='#mucluc.m' className='col item'>M</a>
                <a href='#mucluc.n' className='col item'>N</a>
              </div>
            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <a href='#mucluc.o' className='col item'>O</a>
                <a href='#mucluc.p' className='col item'>P</a>
                <a href='#mucluc.q' className='col item'>Q</a>
                <a href='#mucluc.r' className='col item'>R</a>
                <a href='#mucluc.s' className='col item'>S</a>
                <a href='#mucluc.t' className='col item'>T</a>
                <a href='#mucluc.u' className='col item'>U</a>
              </div>
            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <a href='#mucluc.v' className='col item'>V</a>
                <a href='#mucluc.w' className='col item'>W</a>
                <a href='#mucluc.x' className='col item'>X</a>
                <a href='#mucluc.y' className='col item'>Y</a>
                <a href='#mucluc.z' className='col item'>Z</a>
                <a href='#mucluc.#' className='col item'>#</a>
                <div className='col item-hidden'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Item (Loop)*/}
        <div className='section'>
          {/* Section Heading */}
          <div className='section-heading' id='mucluc.b'>B</div>
          <div className='border-under-heading'></div>
          {/* Section Item List */}
          <div className='section-items row'>
            {/* Item {Loop}*/}
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Bệnh dạ dày</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Bệnh dạ dày</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Bệnh dạ dày</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Bệnh dạ dày</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Bệnh dạ dày</span>
              <div className='border-under-item'></div>
            </div>
          </div>
        </div>

        <div className='section'>
          {/* Section Heading */}
          <div className='section-heading' id='mucluc.c'>C</div>
          <div className='border-under-heading'></div>
          {/* Section Item List */}
          <div className='section-items row'>
            {/* Item {Loop}*/}
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Chuyên khoa mắt</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Chuyên khoa mắt</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Chuyên khoa mắt</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Chuyên khoa mắt</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Chuyên khoa mắt</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Chuyên khoa mắt</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Chuyên khoa mắt</span>
              <div className='border-under-item'></div>
            </div>
          </div>
        </div>

        <div className='section'>
          {/* Section Heading */}
          <div className='section-heading' id='mucluc.d'>D</div>
          <div className='border-under-heading'></div>
          {/* Section Item List */}
          <div className='section-items row'>
            {/* Item {Loop}*/}
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Đau dầu</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Đau dầu</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Đau dầu</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Đau dầu</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Đau dầu</span>
              <div className='border-under-item'></div>
            </div>
          </div>
        </div>

        <div className='section'>
          {/* Section Heading */}
          <div className='section-heading' id='mucluc.n'>N</div>
          <div className='border-under-heading'></div>
          {/* Section Item List */}
          <div className='section-items row'>
            {/* Item {Loop}*/}
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Nha khoa</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Nha khoa</span>
              <div className='border-under-item'></div>
            </div>
            <div className='item col-lg-3 col-md-4 col-sm-6' onClick={() => handleNavigateToPage("danh-sach/chi-tiet-danh-sach")}>
              <span>Nha khoa</span>
              <div className='border-under-item'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList