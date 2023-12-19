import './Search.scss'
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom";


function Search() {
    let history = useHistory();


    const handleClickSearch = () => {
        history.push('/tim-kiem')
    }

    return (
        <div className='search-input' onClick={() => handleClickSearch()}>
            <IoIosSearch className='icon-search' stroke="2" /><span className='place-holder-search'>Tìm chuyên khoa</span>
        </div>
    )
}

export default Search