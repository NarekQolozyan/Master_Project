import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "../components/HomePage/Home";
import LoginForm from '../components/LoginPage/LoginForm';
import UserPage from '../components/UsersPage/User';
import Jobs from '../components/jobs/Jobs';
import Register from '../components/Register/RegisterForm';
import LogIn from '../components/Midllware/Midllware';
import { SignUp } from '../components/Midllware/Midllware';
import RegisterCompany from '../components/CompanyRegister/CompanyRegister';
import UserProfile from '../components/UserProfile/UserProfile';
import CompanyLogin from '../components/CompanyLogin/CompanyLogin';
import CompanyPage from '../components/Company/CompanyPage';
import CreateStatement from '../components/Statement/CreateStatement';
import StatementPage from '../components/StatementPage/StatementPage';
import CompanyProfile from '../components/CompanyProfile/CompanyProfile';

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/logIn' element={<LogIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/loginUser' element={<LoginForm/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/companyRegister' element={<RegisterCompany/>}/>
        <Route path='/userPage' element={<UserPage/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/UserProfile' element={<UserProfile/>}/>
        <Route path='/companylogin' element={<CompanyLogin/>} />
        <Route path='/companyPage' element={<CompanyPage/>}/>
        <Route path='/create_statemant' element={<CreateStatement/>} />
        <Route path='/statement' element={<StatementPage/>} />
        <Route path='/companyProfile' element={<CompanyProfile/>} />
    </Routes>
  )
}
