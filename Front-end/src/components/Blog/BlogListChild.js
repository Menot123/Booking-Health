import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogListChild.scss'
import blog_item from '../../assets/img/blog-list-child-item.png'
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import { FaSearch } from "react-icons/fa";
import { fetchPostsByType } from '../../services/postService'

function BlogListChild() {
    const [posts, setPosts] = useState([])
    const { type } = useParams();
    // Fetch posts
    useEffect(() => {
        getPostsByType()
    }, [])

    const getPostsByType = async () => {
        let res = await fetchPostsByType(type)
        if (res.EC === 0 && res.DT.post.length > 0) {
            setPosts(res.DT.post)
        }
        else {
            console.log("fail to get posts by type")
        }
    }
    const convertBlob2Img = (blob) => {
        let imageCloud = ''
        imageCloud = new Buffer(blob, 'base64').toString('binary')
        return imageCloud
    }
    return (
        <div className='container-bloglist-detail'>
            <div className='container '>
                {/* Search Box */}
                <div className='search-box'>
                    <input type="text" className="input-search form-control" placeholder="Tìm kiếm" />
                    <span className="icon-search"><FaSearch /></span>
                </div>

                {posts.map((data, index) => {
                    return (
                        // Blog Item
                        <a href={`/cam-nang/${data.id}`}>
                            <div className='blog-card'>
                                <div className='row'>
                                    <div className='img-card'>
                                        <img src={convertBlob2Img(data.titleImg)} alt={data.title} />
                                    </div>
                                    <div className='text-card col'>
                                        <div className='title col-md-12'><h5>{data.title}</h5></div>
                                        <div className='content col-md-12'><p>{data.description}</p></div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>


        </div >
    )
}

export default BlogListChild