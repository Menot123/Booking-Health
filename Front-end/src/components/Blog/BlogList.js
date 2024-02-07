import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogList.scss'
import { toast } from 'react-toastify';
import { FaArrowUp } from "react-icons/fa6";
import { fetchAllPostWithoutPage, createPost, getDataUpdatePost, updatePost, deletePost, uploadImage } from '../../services/postService'
import { FormattedMessage } from 'react-intl'

const BlogList = (props) => {
  const [types, setTypes] = useState({})
  // const [position, setPostition] = useState(props.position);

  // Fetch posts
  useEffect(() => {
    getAndSortPosts();
  }, [])

  const normalizeFirstLetter = (letter) => {
    const letterMap = {
      'Ă': 'A',
      'Â': 'A',
      'Đ': 'D',
      'Ê': 'E',
      'Ư': 'U',
      'Ô': 'O',
      'Ơ': 'O'
    };
    if (letter in letterMap) {
      return letterMap[letter];
    }
    return letter;
  };

  const getAndSortPosts = async () => {
    // console.log(props.position)
    let res = await fetchAllPostWithoutPage()
    if (res.EC === 0 && res.DT.length > 0) {
      // Sort Post types by character
      const postTypes = [];
      res.DT.map((item, index) => {
        postTypes.push(item.type)
      })
      postTypes.sort((a, b) => a.localeCompare(b));
      const result = groupTypesByFirstLetter(postTypes);
      setTypes(result);
      // for (const char in result) {
      //   console.log(result[char]);
      // }
    }
    else {
      console.log("fail to get posts")
    }
  }

  const groupTypesByFirstLetter = (types) => {
    const groupedTypes = {};
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      const firstLetter = normalizeFirstLetter(type.charAt(0));
      if (!groupedTypes[firstLetter]) {
        groupedTypes[firstLetter] = new Set();
      }
      groupedTypes[firstLetter].add(type);
    }
    for (const key in groupedTypes) {
      groupedTypes[key] = Array.from(groupedTypes[key]);
    }
    // console.log(groupedTypes)
    return groupedTypes;
  }

  function scrollToIdView(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    else {
      toast.error("This character does not exist in list");
    }
  }

  return (
    <div className='container-bloglist'>
      {/* Scroll to catalogue Button */}
      <div className='fixed-bottom mb-4 me-5 text-end'>
        <div onClick={() => scrollToIdView('search-title')} className='scroll-to-catalogue-container' style={{ cursor: 'pointer' }}>
          <FaArrowUp size={40} color='white' />
        </div>
      </div>

      {/* Body */}
      <div className='container'>
        <div className='search-title border-bottom' id='search-title'>
          <h3> <FormattedMessage id='blog.search-by-char' defaultMessage={'Tìm kiếm theo chữ cái'} /></h3>
        </div>
        <div className='search-dialog'>
          <div className='row'>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <button onClick={() => scrollToIdView('mucluc.A')} className='col item'>A</button>
                <button onClick={() => scrollToIdView('mucluc.B')} className='col item'>B</button>
                <button onClick={() => scrollToIdView('mucluc.C')} className='col item'>C</button>
                <button onClick={() => scrollToIdView('mucluc.D')} className='col item'>D</button>
                <button onClick={() => scrollToIdView('mucluc.E')} className='col item'>E</button>
                <button onClick={() => scrollToIdView('mucluc.F')} className='col item'>F</button>
                <button onClick={() => scrollToIdView('mucluc.G')} className='col item'>G</button>
              </div>
            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <button onClick={() => scrollToIdView('mucluc.H')} className='col item'>H</button>
                <button onClick={() => scrollToIdView('mucluc.I')} className='col item'>I</button>
                <button onClick={() => scrollToIdView('mucluc.J')} className='col item'>J</button>
                <button onClick={() => scrollToIdView('mucluc.K')} className='col item'>K</button>
                <button onClick={() => scrollToIdView('mucluc.L')} className='col item'>L</button>
                <button onClick={() => scrollToIdView('mucluc.M')} className='col item'>M</button>
                <button onClick={() => scrollToIdView('mucluc.N')} className='col item'>N</button>
              </div>
            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <button onClick={() => scrollToIdView('mucluc.O')} className='col item'>O</button>
                <button onClick={() => scrollToIdView('mucluc.P')} className='col item'>P</button>
                <button onClick={() => scrollToIdView('mucluc.Q')} className='col item'>Q</button>
                <button onClick={() => scrollToIdView('mucluc.R')} className='col item'>R</button>
                <button onClick={() => scrollToIdView('mucluc.S')} className='col item'>S</button>
                <button onClick={() => scrollToIdView('mucluc.T')} className='col item'>T</button>
                <button onClick={() => scrollToIdView('mucluc.U')} className='col item'>U</button>
              </div>
            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <button onClick={() => scrollToIdView('mucluc.V')} className='col item'>V</button>
                <button onClick={() => scrollToIdView('mucluc.W')} className='col item'>W</button>
                <button onClick={() => scrollToIdView('mucluc.X')} className='col item'>X</button>
                <button onClick={() => scrollToIdView('mucluc.Y')} className='col item'>Y</button>
                <button onClick={() => scrollToIdView('mucluc.Z')} className='col item'>Z</button>
                <button onClick={() => scrollToIdView('mucluc.#')} className='col item'>#</button>
                <div className='col item-hidden'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Item (Loop)*/}
        {types && Object.keys(types).length > 0 &&
          Object.keys(types).map((key) => {
            const typesArray = types[key];
            return (
              <div className='section' key={key}>

                <div className='section-heading' id={`mucluc.${key}`}>{key}</div>
                <div className='border-under-heading'></div>
                <div className='section-items row'>
                  {/* Item {Loop}*/}
                  {typesArray.map((type, index) => (
                    <div onClick={() => props.handleNavigateToPage("danh-sach/" + type)} className='item col-lg-3 col-md-4 col-sm-6' key={index}>
                      <span>{type}</span>
                      <div className='border-under-item'></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        }
        {/* Example Tab Section */}
        {/* <div className="section">
          <div className="section-heading" id="mucluc.A">A</div>
          <div className="border-under-heading"></div>
          <div className="section-items row">
            <div className="item col-lg-3 col-md-4 col-sm-6">
              <span>Xét nghiệm y học</span>
              <div className="border-under-item">
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default BlogList