import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './BlogListChild.scss'
import blog_item from '../../assets/img/blog-list-child-item.png'
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import { FaSearch, FaHome } from "react-icons/fa";
import { fetchPostsByType } from '../../services/postService'

function BlogListChild(props) {
    const [posts, setPosts] = useState([])
    const [postsWithSearch, setPostsWithSearch] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const { type } = useParams();
    // Fetch posts
    useEffect(() => {
        getPostsByType()
    }, [])

    const getPostsByType = async () => {
        let res = await fetchPostsByType(type)
        if (res.EC === 0 && res.DT.post.length > 0) {
            setIsEmpty(false)
            setPosts(res.DT.post)
            // console.log(res.DT.post)
        }
        else {
            setIsEmpty(true)
            console.log("fail to get posts by type")
        }
    }
    const convertBlob2Img = (blob) => {
        let imageCloud = ''
        imageCloud = new Buffer(blob, 'base64').toString('binary')
        return imageCloud
    }
    const handleChangeSearchInput = (element) => {
        const searchValue = element.target.value
        const searchPostsArray = []
        setSearchInput(searchValue)
        if (searchValue != '') {
            posts.map((post, index) => {
                let title = post.title.toLowerCase()
                let description = post.description.toLowerCase()
                if (title.search(searchValue) >= 0 || description.search(searchValue) >= 0) {
                    searchPostsArray.push(post)
                    // console.log('ok')
                }
            })
            setPostsWithSearch(searchPostsArray)
            setIsSearch(true)
            if (searchPostsArray.length > 0) {
                setIsEmpty(false)
            }
            else setIsEmpty(true)
            // console.log(posts)
            // console.log(searchPostsArray)
        }
        else {
            if (posts.length > 0) {
                setIsEmpty(false)
            }
            else setIsEmpty(true)
            setIsSearch(false)
            setPostsWithSearch([]);
        }
    }
    return (
        <>
            <div className='container-bloglist-detail mb-3'>
                <div className='container '>
                    {/* Search Box */}
                    <div className='search-box'>
                        <input onChange={(e) => handleChangeSearchInput(e)} value={searchInput} type="text" className="input-search form-control" placeholder="Tìm kiếm" />
                        <span className="icon-search"><FaSearch /></span>
                    </div>
                    {
                        isEmpty
                            ? <><h3 className='text-center text-danger mt-3' style={{ marginBottom: '100px' }}><FormattedMessage id="blog.not-found" defaultMessage={'Không tìm thấy bài viết'} /></h3></>
                            : <>
                                {isSearch
                                    ?
                                    <>
                                        {postsWithSearch.map((data, index) => {
                                            return (
                                                // Blog Item
                                                <a key={index} href={`/cam-nang/${data.id}`}>
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
                                    </>
                                    :
                                    <>
                                        {posts.map((data, index) => {
                                            return (
                                                // Blog Item
                                                <a key={index} href={`/cam-nang/${data.id}`}>
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
                                    </>
                                }
                            </>
                    }

                </div>


            </div >
        </>
    )
}

export default BlogListChild