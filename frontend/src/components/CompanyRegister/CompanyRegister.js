import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerCompany } from '../../features/companySlice';
import './CompanyRegister.css'
import { useNavigate } from 'react-router-dom';

function RegistrationComponent() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.company.loading);
  const error = useSelector((state) => state.company.error);
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [err, setErr] = useState('')

  const handleRegistration = () => {
    try{
      dispatch(registerCompany({ name, email, password, image }));
      if(!error){
        alert("Company created successfully, now log in")
        navigate('/companylogin')
      }else{
        setErr('Invalid register credentials');
      }
   }catch(err){
      console.error("There was an error registered in: ", err)
  }};

  return (
    <div>
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
    <div className='registration-container'>
      <h2 className='h2'>Company Registration</h2>
      {error && <p>{error}</p>}
      <form>
        <label>
          
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Company Name'/>
        </label>
        <br />
        <label>
          
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
        </label>
        <br />
        <label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        <button type="button" onClick={handleRegistration} disabled={loading} className='registration-button'>
          Register
        </button>
        <p className=''>Already have an account? <a onClick={() => navigate('/companyLogin')}>Sign in</a></p>
      </form>
    </div>
    </div>
  );
}

export default RegistrationComponent;
