import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss'

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("start")
      try {
        const response = await axios.post('http://localhost:8769/login', {
          username,
          password,
        });
        // Xử lý phản hồi từ server (response) ở đây
        // Ví dụ: kiểm tra response.data để xác định đăng nhập thành công hay không
        console.log(response)
        // Chuyển sang trang web khác sau khi đăng nhập thành công
        if (response.data.success) {
          window.location.href = '/home';
        }
        else{
          window.alert("Login failed")
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
      }
    };

    return (
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
                  />
                  <input type="checkbox" id="check"onChange={() => setShowPassword((prev) => !prev)} /> Show Password
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
    )
}

export default Login