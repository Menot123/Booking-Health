import React, { useState, useRef, useEffect } from 'react';
import axios from '../../axios/axios';
import './Login.scss'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../../services/userService'
import { useDispatch } from 'react-redux'
import { setAuth, fetchAccount, setRole } from '../../redux/slices/userSlice'
import { getUserAccount, getRoleUser } from '../../services/userService'

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()

  const defaultIsValidInput = {
    usernameValid: true,
    passwordValid: true,
  }
  const [isValidInput, setIsValidInput] = useState(defaultIsValidInput)
  const usernameRef = useRef(null);
  const passwordRef = useRef(null)

  const isMounted = useRef(true); // Tạo một biến định thời

  useEffect(() => {
    return () => {
      isMounted.current = false; // Đánh dấu component đã bị huỷ bỏ
    };
  }, []);

  const handleLogin = async () => {
    if (!username) {
      setIsValidInput({ ...defaultIsValidInput, usernameValid: false })
      toast.error('Please enter your username')
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
      return
    }
    if (!password) {
      setIsValidInput({ ...defaultIsValidInput, passwordValid: false })
      toast.error('Please enter your password')
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      return
    }
    try {
      const response = await login(username, password)
      // Kiểm tra trạng thái của component trước khi thực hiện các hành động thay đổi state
      if (isMounted.current) {
        if (response.EC === 0) {
          let payload = {
            token: response.DT.access_token,
            account: response.DT.username
          }
          let account = await getUserAccount()
          let userRole = await getRoleUser(username)
          if (account && account.EC === 0) {
            if (isMounted.current) {
              dispatch(fetchAccount(account.DT));
              dispatch(setRole(userRole?.DT?.roleId))
            }
          }
          dispatch(setAuth(payload))
          if (isMounted.current) {
            setUsername('');
            setPassword('');

            if (userRole?.DT?.roleId === 'R2') {
              history.push('/doctor/manage-schedules')
            } else {
              history.push('/admin');
            }
          }
        }
        else {
          alert("Your username or password is incorrect")
          if (isMounted.current) {
            setUsername('');
            setPassword('');
          }
        }
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
            <div className="card" >
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>

                {/* Username */}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    ref={usernameRef}
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {/* Password */}
                <div className="form-group mt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    value={password}
                    ref={passwordRef}
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
                  <button className="btn btn-primary custom-gradient" onClick={() => handleLogin()}>Login</button>
                </div>
                <p className="card-text text-end mt-2">
                  <a href="/forgot-password">Forgot password?</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login