import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import white_logo from '../../logo/white_logo.jpg'
import {Input, Button, Space} from "antd"

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await dispatch(register({ firstName, lastName, password }));
      if (register.fulfilled.match(response)) {
        alert("User created successfully, now log in")
        navigate('/login');
      } else {
        setErr('Invalid register credentials');
      }
    } catch (error) {
      console.error('There was an error registering in:', error);
    }
  };
  

  return (
    <div className='register_container'>
    <div className='register-nav-bar'>
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
    <div className="header-register">
      <img src={white_logo}/>
    <form onSubmit={handleRegister} className="register-form">
      <h1>Register</h1>
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
      <Space direction='horizontal' className='password'>
      <Input.Password
          placeholder="Password"
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
        <Button style={{ width: 80,marginRigth: 20 }} onClick={() => setPasswordVisible((prevState) => !prevState)} className='showHide'>
          {passwordVisible ? 'Hide' : 'Show'}
        </Button>
      </Space>
          {error && <p className="error-message">{error}</p>}
      <br />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p className='signUp-massage'>Already have an account? <a onClick={() => navigate('/loginUser')}>Log in</a></p>
    </form>
    </div>
    </div>
  );
};

export default Register;
