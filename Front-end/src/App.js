import './App.scss'
import Nav from './components/Navigation/Nav';
import Foot from './components/Footer/Foot';
import Sup from './components/Support/Sup';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
// import { Context } from './HOC/Wrapper'
import { useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars'
import { path } from './utils/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import BlogDetail from './components/BlogDetail/BlogDetail';
import Admin from './admin/Admin';
import PrivateRoutes from './routes/PrivateRoutes';
import LoginRoute from './routes/LoginRoute';

function App() {


  useEffect(() => {
  }, [])

  const url = window.location.pathname;
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Scrollbars className='scroll-bars'
          renderThumbVertical={({ style, ...props }) => (

            <div {...props} className="custom-thumb-vertical" style={{ padding: '0 17px 0 0' }} />
          )}
          autoHide autoHideTimeout={1000} autoHideDuration={200} style={{ width: '100%', height: '100%' }}>
          {url === '/login' || url === '/admin' ? ' ' : <Nav />}
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
            <Route path={path.BLOG} exact>
              <Blog />
            </Route>
            <Route path={path.BLOGDETAIL} exact>
              <BlogDetail />
            </Route>
            <PrivateRoutes path={path.ADMIN} component={Admin} />
            <Route path={path.HOMEPAGE}>
              <Home />
            </Route>
            <Route exact path={path.HOME}>
              <Home />
            </Route>

            <Route exact path="*">
              404 Not found
            </Route>
          </Switch>
          {url === '/login' || url === '/admin' ? ' ' : <Foot />}
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


