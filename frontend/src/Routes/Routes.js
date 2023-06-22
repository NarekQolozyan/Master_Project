import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import AllCompanies from '../components/Companies/Companies';
export default function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()
  const chekToken = () => {
    
    const token = localStorage.getItem('jwt')
      if(!token){
        return (
          <div>
            <p>Sorry, this page is unavailable. Please log in or sign up for view this page</p>
            <button onClick={()=> navigate('./logIn')}>Log in</button>
            <button>Sign Up</button>
          </div>
        )}
        else {
          // Render the appropriate component based on the URL
          if (location.pathname === '/userPage') {
            return <UserPage />;
          } else if (location.pathname === '/companyPage') {
            return <CompanyPage />;
          } else if (location.pathname === '/create_statemant') {
            return <CreateStatement />;
          } else if (location.pathname === '/companyProfile') {
            return <CompanyProfile />;
          } else if(location.pathname === '/userProfile'){
            return <UserProfile/> 
          }else {
            // Return a default component or a not found page
            return <p>Page not found</p>;
          }
        }
    }
    const chekLocalStorage = () => {
      if(location.pathname === "/"){
        localStorage.removeItem('jwt')
        localStorage.removeItem('userId')
        localStorage.removeItem('companyId')
      }
    }

    useEffect(() => {
      chekLocalStorage();
    }, [location.pathname]); 
    
  return (
    <Routes><Route path='/' element={<Home/>}/><Route path='/logIn' element={<LogIn/>}/> <Route path='/signUp' element={<SignUp/>}/> <Route path='/loginUser' element={<LoginForm/>}/> <Route path='/register' element={<Register/>}/>
        <Route path='/companyRegister' element={<RegisterCompany/>}/>
        <Route path='/userPage' element={chekToken()}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/UserProfile' element={chekToken()}/>
        <Route path='/companylogin' element={<CompanyLogin/>} />
        <Route path='/companyPage' element={chekToken()}/>
        <Route path='/create_statemant' element={chekToken()} />
        <Route path='/statement' element={<StatementPage/>} />
        <Route path='/companyProfile' element={chekToken()} />
        <Route path='/allCompanies' element={<AllCompanies/>} />
    </Routes>
  )
}
