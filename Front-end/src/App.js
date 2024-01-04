import './App.scss'
import Nav from './components/Navigation/Nav';
import Foot from './components/Footer/Foot';
import Sup from './components/Support/Sup';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { FormattedMessage } from 'react-intl'
// import { Context } from './HOC/Wrapper'
import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { translate } from './redux/slices/languageSlice'
import { Scrollbars } from 'react-custom-scrollbars'



import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import BlogDetail from './components/BlogDetail/BlogDetail';


function App() {


  useEffect(() => {
  }, [])

  const url = window.location.pathname;
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
          {url === '/login' ? ' ' : <Nav />}
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/co-so-y-te">
              Co so y te
            </Route>
            <Route path="/song-khoe">
              Song Khoe
            </Route>
            <Route path="/ho-tro">
              <Sup />
            </Route>
            <Route path="/cam-nang" exact>
              <Blog />
            </Route>
            <Route path="/cam-nang/chi-tiet" exact>
              <BlogDetail />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*">
              404 Not found
            </Route>
          </Switch>
          {url === '/login' ? ' ' : <Foot />}
        </Scrollbars>
      </div>
    </BrowserRouter>
  );
}

export default App;


