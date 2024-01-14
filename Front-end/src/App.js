import './App.scss'
import Nav from './components/Navigation/Nav';
import Foot from './components/Footer/Foot';
import Sup from './components/Support/Sup';
import {
  BrowserRouter,
  Switch,
  Route,
  useLocation
} from "react-router-dom";
// import { Context } from './HOC/Wrapper'
import { useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars'
import { path } from './utils/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Login from './components/Login/Login';
import Home from './components/Home/Home';

import LoginRoute from './routes/LoginRoute';
import NotFound from './components/404_Not_Found/NotFound';
import AdminRoute from './routes/AdminRoute'
import BlogRoute from './routes/BlogRoute';


function App() {


  const scrollbarsRef = useRef(null);

  const scrollToTop = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollTop(0);
    }
  };

  const url = window.location.pathname;



  return (
    <BrowserRouter>

      <div className='app-container'>
        <Scrollbars ref={scrollbarsRef} className='scroll-bars'
          renderThumbVertical={({ style, ...props }) => (

            <div {...props} className="custom-thumb-vertical" style={{ padding: '0 17px 0 0' }} />
          )}
          autoHide autoHideTimeout={1000} autoHideDuration={200} style={{ width: '100%', height: '100%' }}>
          {url === '/login' || url.includes('/admin') ? ' ' : <Nav />}
          <Switch>
            <LoginRoute path={path.LOGIN} component={Login} />
            <Route path={path.CO_SO_Y_TE}>
              Co so y te
            </Route>
            <Route path={path.SONG_KHOE}>
              Song Khoe
            </Route>
            <Route path={path.HO_TRO}>
              <Sup />
            </Route>

            {/* Blog */}
            <Route
              path={path.BLOG}
              render={(routeProps) => (
                <BlogRoute {...routeProps} scrollToTop={scrollToTop} />
              )}
            />
            {/* End Blog */}
            {/* Admin route */}
            <Route path={path.ADMIN} component={AdminRoute} />
            {/* End admin route */}
            <Route path={path.HOMEPAGE}>
              <Home />
            </Route>
            <Route exact path={path.HOME}>
              <Home />
            </Route>

            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
          {url === '/login' || url.includes('/admin') ? ' ' : <Foot />}
        </Scrollbars>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>

  );
}

export default App;


