import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompany, deleteCompany } from '../../features/companySlice';
import './CompanyProfile.css'
import { useNavigate } from 'react-router-dom';
import {DeleteFilled} from '@ant-design/icons'
import NavBar from '../navbar/Nav-bar';
const CompanyProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const company = useSelector((state) => state.company);
  const [name, setName] = useState(company?.name || '');
  const [email, setEmail] = useState(company?.email || '');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState()

  const handleUpdateCompany = () => {
    if(password === comfirmPassword){
      dispatch(updateCompany({ name, email, password }));
      alert("Concratulations, your data has been successfully updated")
      navigate('/companyPage')
    }else {
        alert("Please write same password in both fields")
    }
  };

  const hendleDelete = () => {
    const companyId = localStorage.getItem('companyId')
    dispatch(deleteCompany(companyId))
    localStorage.clear()
    navigate('/')
  }

  return (
      <div>
        <NavBar/>
        <div className='user-profile-container'>
          <h1>Update my data</h1>
          <div>
            <label htmlFor="firstName">Company Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
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
          <button onClick={handleUpdateCompany} className='update'>Update User</button><br/>
          <button className='delete' onClick={() => hendleDelete()}>Delete my account <DeleteFilled style={{fontSize: '22px'}}/></button>
        </div>
        </div>
      );
    };

    export default CompanyProfile
