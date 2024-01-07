import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Wrapper from './HOC/Wrapper'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import axios from './axios/axios'
import { logout } from './redux/slices/userSlice'
import { toast } from 'react-toastify'


let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <Wrapper>
      <React.StrictMode>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </React.StrictMode>
    </Wrapper>
  </Provider>,
  document.getElementById('root')
);

const UNAUTHORIZED = 401;
const { dispatch } = store; // direct access to redux store.
axios.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === UNAUTHORIZED && window.location.pathname !== '/' && window.location.pathname !== '/login') {
      toast.error('Unauthorized the user. Please login ...')
      dispatch(logout());
    }
    return Promise.reject(error);
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
