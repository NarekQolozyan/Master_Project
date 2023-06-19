import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import white_logo from '../../logo/white_logo.jpg'
import {Input, Button, Space} from "antd"

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const user = useSelector((state) => state.user)
  const error = useSelector((state) => state.user.error);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await dispatch(login({ firstName, lastName, password }));
      if (login.fulfilled.match(response)) {
        navigate('/userPage');
        console.log(user.user.id,"xzcdzdcvdzv")
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
      <h1>Login as user</h1>
      <label>
        <Input
          placeholder='First Name'
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
      </label>
      <label>
        <Input
          placeholder='Last Name'
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
          {error && <p className="error-message">{error}</p>}
        <Button style={{ width: 80 }} onClick={() => setPasswordVisible((prevState) => !prevState)} className='hideShow'>
          {passwordVisible ? 'Hide' : 'Show'}
        </Button>
      </Space>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <p className='signUp-massage'>Don't have an account yet? <a onClick={() => navigate('/register')}>Sign Up</a></p>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
