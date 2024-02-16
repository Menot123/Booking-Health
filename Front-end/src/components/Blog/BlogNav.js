import React from 'react'
import './BlogNav.scss'
import { FaHome } from "react-icons/fa";
import { FormattedMessage } from 'react-intl'
import { IoMdHome } from "react-icons/io";
function BlogNav(props) {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    const lastPath = pathArray[pathArray.length - 1];
    // console.log(pathArray)
    return (
        <>
            <div className='container'>
                {/* <FaHome onClick={() => props.handleNavigateToPage('/')} style={{ color: "blue", fontSize: "19", cursor: "pointer" }} /> */}
                <IoMdHome onClick={() => props.handleNavigateToPage('/')} color="#45c3d2" fontSize="1.5em" />
                {pathArray.map((path, index) => {
                    // console.log(path)
                    if (pathArray.length == 1 == index + 1) {
                        return (<span key={index} style={{ fontSize: "17px" }}> / <FormattedMessage id="blog.handbook" defaultMessage={'Cẩm nang'} /></span>)
                    }
                    else if (pathArray.length == 2 == index + 1) {
                        return (
                            <React.Fragment key={index}>
                                <span onClick={() => props.handleNavigateToPage('/cam-nang')} style={{ fontSize: "17px", color: "#438b94", cursor: "pointer" }}> / <FormattedMessage id="blog.handbook" defaultMessage={'Cẩm nang'} /></span>
                                <span style={{ fontSize: "17px" }}> / <FormattedMessage id="blog.handbook-list" defaultMessage={'Danh sách'} /></span>
                            </React.Fragment>
                        )
                    }
                    else if (pathArray.length == 3 == index + 1) {
                        return (
                            <React.Fragment key={index}>
                                <span onClick={() => props.handleNavigateToPage('/cam-nang')} style={{ fontSize: "17px", color: "#438b94", cursor: "pointer" }}> / <FormattedMessage id="blog.handbook" defaultMessage={'Cẩm nang'} /></span>
                                <span onClick={() => props.handleNavigateToPage('/cam-nang/danh-sach')} style={{ fontSize: "17px", color: "#438b94", cursor: "pointer" }}> / <FormattedMessage id="blog.handbook-list" defaultMessage={'Danh sách'} /></span>
                                <span style={{ fontSize: "17px" }}> / {decodeURIComponent(lastPath)}</span>
                            </React.Fragment>
                        );
                    }
                })}
            </div>
        </>
    )
}
export default BlogNav