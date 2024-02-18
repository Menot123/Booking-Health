import React, { useState, useRef, useEffect } from 'react';
import './Forgot_Password.scss'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sendOTP, resetPassword, checkingOTP } from '../../services/userService'

const Forgot_Password = (props) => {
  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Email Step
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  // OTP Step
  const [OTP, setOTP] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Reset Password Step
  const [isCorrectOTP, setIsCorrectOTP] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory()

  useEffect(() => {
    if (countdown === 0) {
      setIsButtonDisabled(false);
    }
  }, [countdown]);

  const encodeEmail = (email) => {
    var atIndex = email.indexOf('@');
    var dotIndex = email.lastIndexOf('.');
    var username = email.substring(0, atIndex);
    var domain = email.substring(atIndex + 1, dotIndex);

    // Mã hóa ký tự trong phần username
    var encodedUsername = username.substring(0, 4) + '****';

    return encodedUsername + '@' + domain + '.' + email.substring(dotIndex + 1);
  }

  const getCode = async () => {
    setIsLoading(true);
    const res = await sendOTP(email)
    setIsLoading(false);
    if (res.EC == 0) {
      setIsEmail(true)
      setIsButtonDisabled(true);
      setCountdown(50);

      // Đếm ngược từ 50 về 0
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      // Khi đếm ngược kết thúc
      setTimeout(() => {
        setIsButtonDisabled(false);
        clearInterval(interval);
      }, 50000);
    }
    else {
      toast.error(res.EM)
    }
  }

  const validateOTP = async () => {
    setIsLoading(true);
    const res = await checkingOTP(email, OTP);
    setIsLoading(false);
    if (res.EC == 0) {
      setIsCorrectOTP(true)
    }
    else {
      toast.error('OTP is not correct')
    }
  }

  const changePassword = async () => {
    if (password == confirmPassword && password != '') {
      const res = await resetPassword(email, password)
      if (res.EC == 0) {
        toast.success('Change password was successful, please login!');
        setTimeout(() => {
          setIsCorrectOTP(false)
          setOTP("")
          history.push('/login')
        }, 3000)
      }
      else {
        toast.error(res.EM)
      }
    }
    else {
      toast.error('Password confirm is incorrect or you let it empty')
    }
  }

  return (
    <div className='home-container-background'>

      <div className="container">
        {isLoading
          ?
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
          : ''
        }

        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <div className="card" >
              <div className="card-body">
                {isCorrectOTP && isEmail
                  ?
                  <>
                    {/* Reset Passowrd */}
                    <h3 className="card-title text-center">Reset Password</h3>
                    <div className="form-group">
                      <label htmlFor="password">Enter password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        placeholder="Enter your new password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Confirm password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password-confirm"
                        value={confirmPassword}
                        placeholder="Enter again your new password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="d-grid gap-2 pt-4">
                      <button className="btn btn-primary custom-gradient" onClick={() => changePassword()}>Change Password</button>
                    </div>
                    <p className="card-text text-start mt-2">
                      <a href="/login">Back to login</a>
                    </p>
                  </>
                  :
                  isEmail
                    ?
                    <>
                      {/* Enter OTP */}
                      <h3 className="card-title text-center">OTP Authentication</h3>
                      <div className='fst-italic'>We'd sent OTP code to your email</div>
                      <div><span>Your email: </span> <span className='text-primary'>{encodeEmail(email)}</span></div>
                      <div className="form-group mt-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input
                          type="text"
                          className="form-control"
                          id="otp"
                          value={OTP}
                          placeholder="Enter OTP"
                          onChange={(e) => setOTP(e.target.value)}
                        />
                        <button onClick={getCode} disabled={isButtonDisabled} type='button' className='btn btn-success ms-1'>
                          <span style={{ whiteSpace: 'nowrap' }}>{countdown === 0 ? 'Resend' : 'Resend after: ' + countdown}</span>
                        </button>
                      </div>
                      <div className="d-grid gap-2 pt-4">
                        <button className="btn btn-primary custom-gradient" onClick={() => validateOTP()}>Confirm</button>
                      </div>
                      <p className="card-text text-start mt-2">
                        <a href="/login">Back to login</a>
                      </p>
                    </>
                    :
                    <>
                      {/* Forgot Password */}
                      <h3 className="card-title text-center">Forgot Password</h3>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          value={email}
                          placeholder="Enter your email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="d-grid gap-2 pt-4">
                        <button className="btn btn-primary custom-gradient" onClick={() => getCode()}>Get Code</button>
                      </div>
                      <p className="card-text text-start mt-2">
                        <a href="/login">Back to login</a>
                      </p>
                    </>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgot_Password