import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { companyLogin } from '../../features/companySlice';
import { useNavigate } from 'react-router-dom';
// import './LoginForm.css';
import white_logo from '../../logo/white_logo.jpg'
import {Input, Button, Space} from "antd"

const CompanyLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user)
  const error = useSelector((state) => state.user.error);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await dispatch(companyLogin({ name, email, password }));
      if (companyLogin.fulfilled.match(response)) {
        navigate('/companyPage');
        // console.log(user.user.id,"xzcdzdcvdzv")
      } else {
        setErr('Invalid login credentials');
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
    }
  };
  

  return (
    <div className='login_container'>
    <div className='login-nav-bar'>
        <p onClick={() => navigate('/')} className='title'>Dream Job</p>
        <ul>
            <li onClick={() => navigate('/jobs')}>
              Աշխատանք
            </li>
            <li>
              Ընկերություններ
            </li>
          </ul>
      </div>
    <div className="header-login">
      <img src={white_logo}/>
    <form onSubmit={handleLogin} className="login-form">
      <h1>Login as company</h1>
      <label>
        <Input
          placeholder='Company Name'
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </label>
      <label>
        <Input
          placeholder='Email'
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
      </label>
      <Space direction='horizontal'>
      <Input.Password
          placeholder="Password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
        <Button style={{ width: 80 }} onClick={() => setPasswordVisible((prevState) => !prevState)} className='hideShow'>
          {passwordVisible ? 'Hide' : 'Show'}
        </Button>
      </Space>
          {error && <p className="error-message">{error}</p>}
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p className='signUp-massage'>Don't have an account yet? <a onClick={() => navigate('/companyRegister')}>Sign Up</a></p>
    </form>
    </div>
    </div>
  );
};

export default CompanyLogin;
