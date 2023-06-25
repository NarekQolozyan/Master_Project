import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser} from '../../features/userSlice';
import './UserProfile.css'
import { useNavigate } from 'react-router-dom';
import {DeleteFilled} from '@ant-design/icons'
import NavBar from '../navbar/Nav-bar';


const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  console.log(user?.user?.id)
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState()

  const handleUpdateUser = () => {
    if(!firstName || !lastName || !password || !confirmPassword){
      alert("Please fill all fields")
    }
    else if(password === confirmPassword){
      dispatch(updateUser({ firstName, lastName, password }));
      alert("Concratulations, your data has been successfully updated")
      navigate('/userPage')
    }else {
        alert("Please write same password in both fields")
    }
  };

  const hendleDelete = () => {
    dispatch(deleteUser())
    localStorage.clear()
    navigate('/')
  }

  return (
        <div>
        <NavBar/>
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
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="text"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handleUpdateUser} className='update'>Update User</button><br/>
          <button className='delete' onClick={() => hendleDelete()}>Delete my account <DeleteFilled style={{fontSize: '22px'}}/></button>
        </div>
        </div>
      );
    };

    export default UserProfile
