import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import { path } from '../../src/utils/index'

import Blog from '../components/Blog/Blog';
import BlogDetail from '../components/Blog/BlogDetail';
import BlogList from '../components/Blog/BlogList';
import BlogListChild from '../components/Blog/BlogListChild';

function BlogRoute(props) {
    return (
        <Switch>
            <Route path={path.BLOG} exact >
                <Blog scrollToTop={props.scrollToTop} />
            </Route>
            <Route path={path.BLOGLIST} exact>
                <BlogList scrollToTop={props.scrollToTop} />
            </Route>
            <Route path={path.BLOGLISTCHILD} exact>
                <BlogListChild scrollToTop={props.scrollToTop} />
            </Route>
            <Route path={path.BLOGDETAIL} exact>
                <BlogDetail scrollToTop={props.scrollToTop} />
            </Route>
        </Switch>

    )
}

export default BlogRoute