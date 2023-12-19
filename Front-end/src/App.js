import './App.scss'
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { FormattedMessage } from 'react-intl'
// import { Context } from './HOC/Wrapper'
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { translate } from './redux/slices/languageSlice'



import Login from './components/Login/Login';
import Home from './components/Home/Home';


function App() {
  // const context = useContext(Context)
  const locale = useSelector(state => state.language.value)
  const dispatch = useDispatch()


  const url = window.location.pathname;
  return (
    <BrowserRouter>
      <div className='app-container'>
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
            Ho tro
          </Route>
          <Route exact path="/">
            <FormattedMessage
              id="find-specialty"
              defaultMessage={'Find specialty'}
            />
            <Home />
          </Route>
          <Route exact path="*">
            404 Not found
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;


