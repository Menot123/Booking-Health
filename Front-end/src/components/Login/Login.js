import React, { useState } from 'react';
import axios from '../../axios/axios';
import './Login.scss'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../services/userService'
import { useSelector, useDispatch } from 'react-redux'
import { setAuth, fetchAccount } from '../../redux/slices/userSlice'
import { getUserAccount } from '../../services/userService'

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.success('Login')
    try {
      const response = await login(username, password)
      if (response.EC === 0) {
        let payload = {
          token: response.DT.access_token,
          account: response.DT.username
        }
        let account = await getUserAccount()
        if (account && account.EC === 0) {
          dispatch(fetchAccount(account.DT.username))
        }
        dispatch(setAuth(payload))
        setUsername('')
        setPassword('')
        history.push('/admin');
      }
      else {
        window.alert("Your username or password is incorrect")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnterLogin = (e) => {
    if (e.charCode === 13 && e.code === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className='home-container-background'>

      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <form className="card" onSubmit={handleLogin}>
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>

                {/* Username */}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="form-group mt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => handleEnterLogin(e)}
                  />
                  <input type="checkbox" id="check" onChange={() => setShowPassword((prev) => !prev)} /> Show Password
                </div>

                <div className="d-grid gap-2 pt-4">
                  <button type="submit" className="btn btn-primary custom-gradient">Login</button>
                </div>
                <p className="card-text text-end mt-2">
                  <a href="#">Forgot password?</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login