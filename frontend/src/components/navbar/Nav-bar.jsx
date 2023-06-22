import React, { useEffect, useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import './Nav-bar.css'

export default function NavBar() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut);
    navigate('/');
  };

  const [decodedToken, setDecodedToken] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      try {
        const decoded = jwt_decode(jwt);
        setDecodedToken(decoded);
        console.log(decoded);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const navbar = () => {
    if (decodedToken.role === 'user') {
      return (
        <div className='nav-bar'>
          <p onClick={() => navigate('/')}>Dream Job</p>
          <ul>
            <li onClick={() => navigate('/jobs')}>Աշխատանք</li>
            <li onClick={() => navigate('/allCompanies')}>Ընկերություններ</li>
          </ul>
          <ul>
            <li onClick={() => navigate('/userProfile')}>Profile</li>
            <li>
              <LogoutOutlined type='primary' onClick={handleLogOut} />
            </li>
          </ul>
        </div>
      );
    } else if (decodedToken.role === 'company') {
      return (
        <div className='nav-bar'>
          <p onClick={() => navigate('/companyPage')}>Dream Job</p>
          <ul>
            <li onClick={() => navigate('/create_statement')}>
              Ստեղծել հայտարարություն
            </li>
          </ul>
          <ul>
            <li onClick={() => navigate('/companyProfile')}>My Profile</li>
            <li>
              <LogoutOutlined type='primary' onClick={handleLogOut} />
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className='nav-bar'>
          <p onClick={() => navigate('/')}>Dream Job</p>
          <ul>
            <li onClick={() => navigate('/jobs')}>Աշխատանք</li>
            <li onClick={() => navigate('/allCompanies')}>Ընկերություններ</li>
          </ul>
          <ul>
            <li onClick={() => navigate('/logIn')}>Մուտք</li>
            <li onClick={() => navigate('/signUp')}>Գրանցում</li>
          </ul>
        </div>
      );
    }
  };

  return <div>{navbar()}</div>;
}
