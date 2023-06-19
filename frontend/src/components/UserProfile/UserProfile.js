import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../features/userSlice';
import './UserProfile.css'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  console.log(user?.user?.id)
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState()

  const handleUpdateUser = () => {
    if(password === comfirmPassword){
      dispatch(updateUser({ firstName, lastName, password }));
      alert("Concratulations, your data has been successfully updated")
      navigate('/userPage')
    }else {
        alert("Please write same password in both fields")
    }
  };

  return (
        <div>
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
    <div className='user-profile-container'>
      <h1>Update my data</h1>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Comfirm Password:</label>
        <input
          type="text"
          id="password"
          value={comfirmPassword}
          onChange={(e) => setComfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
    </div>
  );
};

export default UserProfile
