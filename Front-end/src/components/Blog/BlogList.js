import React from 'react';
import { useState, useEffect, useRef } from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogList.scss'
import { useHistory } from "react-router-dom";
import { fetchAllPostWithoutPage, createPost, getDataUpdatePost, updatePost, deletePost, uploadImage } from '../../services/postService'
import { FormattedMessage } from 'react-intl'

const BlogList = (props) => {
  let history = useHistory();
  const handleNavigateToPage = (path) => {
    history.push(path);
    props.scrollToTop()
  };

  const [posts, setPosts] = useState([])
  const [types, setTypes] = useState({})
  // Fetch posts
  useEffect(() => {
    getAndSortPosts()
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

  const getAndSortPosts = async () => {
    let res = await fetchAllPostWithoutPage()
    if (res.EC === 0 && res.DT.length > 0) {
      // Sort Post types by character
      const postTypes = [];
      res.DT.map((item, index) => {
        postTypes.push(item.type)
      })
      postTypes.sort((a, b) => a.localeCompare(b));
      const result = groupTypesByFirstLetter(postTypes);
      setPosts(res.DT);
      setTypes(result);
      // for (const char in result) {
      //   console.log(result[char]);
      // }
    }
    else {
      console.log("fail to get posts")
    }
  }

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
                <a href='#mucluc.A' className='col item-selected'>A</a>
                <a href='#mucluc.B' className='col item'>B</a>
                <a href='#mucluc.C' className='col item'>C</a>
                <a href='#mucluc.D' className='col item'>D</a>
                <a href='#mucluc.E' className='col item'>E</a>
                <a href='#mucluc.F' className='col item'>F</a>
                <a href='#mucluc.G' className='col item'>G</a>
              </div>

            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <a href='#mucluc.H' className='col item'>H</a>
                <a href='#mucluc.I' className='col item'>I</a>
                <a href='#mucluc.J' className='col item'>J</a>
                <a href='#mucluc.K' className='col item'>K</a>
                <a href='#mucluc.L' className='col item'>L</a>
                <a href='#mucluc.M' className='col item'>M</a>
                <a href='#mucluc.N' className='col item'>N</a>
              </div>
            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <a href='#mucluc.O' className='col item'>O</a>
                <a href='#mucluc.P' className='col item'>P</a>
                <a href='#mucluc.Q' className='col item'>Q</a>
                <a href='#mucluc.R' className='col item'>R</a>
                <a href='#mucluc.S' className='col item'>S</a>
                <a href='#mucluc.T' className='col item'>T</a>
                <a href='#mucluc.U' className='col item'>U</a>
              </div>
            </div>
            <div className='col-md-3 group-items'>
              <div className='row'>
                <a href='#mucluc.V' className='col item'>V</a>
                <a href='#mucluc.W' className='col item'>W</a>
                <a href='#mucluc.X' className='col item'>X</a>
                <a href='#mucluc.Y' className='col item'>Y</a>
                <a href='#mucluc.Z' className='col item'>Z</a>
                <a href='#mucluc.#' className='col item'>#</a>
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
                    <div onClick={() => handleNavigateToPage("danh-sach/" + type)} className='item col-lg-3 col-md-4 col-sm-6' key={index}>
                      <span>{type}</span>
                      <div className='border-under-item'></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default BlogList