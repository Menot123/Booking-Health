import './App.scss'
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Nav />
        <Switch>
          <Route exact path="/news">
            News page
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
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
