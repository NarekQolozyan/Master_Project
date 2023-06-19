import React from 'react'
import './Midllware.css'
import { useNavigate } from 'react-router-dom'

export default function LogIn() {
    const navigate = useNavigate()
  return (
    <div className='signUp-container'>
        <div className='signUp-main'>
            <div onClick={() => navigate('/loginUser')}>
                <p>As a user</p>
            </div>
            <div onClick={() => navigate('/companylogin')}>
                <p>As a company</p>
            </div>
        </div>
    </div>
  )
}

export function SignUp() {
    const navigate = useNavigate()
    return (
        <div className='signUp-container'>
            <div className='signUp-main'>
                <div onClick={() => navigate('/register')}>
                    <p>As a user</p>
                </div>
                <div onClick={() => navigate('/companyRegister')}>
                    <p>As a company</p>
                </div>
            </div>
        </div>
    )
}