import React from 'react'
import { useState, useEffect } from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import { path } from '../../src/utils/index'

import BlogNav from '../components/Blog/BlogNav';
import Blog from '../components/Blog/Blog';
import BlogDetail from '../components/Blog/BlogDetail';
import BlogList from '../components/Blog/BlogList';
import BlogListChild from '../components/Blog/BlogListChild';
import { useHistory } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function BlogRoute(props) {
    let history = useHistory();
    const handleNavigateToPage = (path) => {
        history.push(path)
        props.scrollToTop()
    };
    return (
        <Switch>
            <Route path={path.BLOG} exact >
                <BlogNav handleNavigateToPage={handleNavigateToPage} />
                <Blog handleNavigateToPage={handleNavigateToPage} />
            </Route>
            <Route path={path.BLOGLIST} exact>
                <BlogNav handleNavigateToPage={handleNavigateToPage} />
                <BlogList handleNavigateToPage={handleNavigateToPage} />
            </Route>
            <Route path={path.BLOGLISTCHILD} exact>
                <BlogNav handleNavigateToPage={handleNavigateToPage} />
                <BlogListChild handleNavigateToPage={handleNavigateToPage} />
            </Route>
            <Route path={path.BLOGDETAIL} exact>
                {/* This path has another customer BlogNav */}
                <BlogDetail handleNavigateToPage={handleNavigateToPage} />
            </Route>
        </Switch>

    )
}

export default BlogRoute