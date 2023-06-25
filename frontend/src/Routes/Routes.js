import React, { useEffect,useState } from 'react'
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
import CompanyProfile from '../components/CompanyProfile/CompanyProfile';
import AllCompanies from '../components/Companies/Companies';
import jwt_decode from 'jwt-decode';

export default function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const checkToken = async () => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return (
        <div>
          <p>Sorry, this page is unavailable. Please log in or sign up to view this page</p>
          <button onClick={() => navigate('./logIn')}>Log in</button>
          <button>Sign Up</button>
        </div>
      );
    } else {
      if (decodedToken.role === 'user' && location.pathname === '/userPage') {
        return <UserPage />;
      } else if (decodedToken.role === 'user' && location.pathname === '/companyPage') {
        return <CompanyPage />;
      } else if (decodedToken.role === 'company' && location.pathname === '/create_statemant') {
        return <CreateStatement />;
      } else if (decodedToken.role === 'company' && location.pathname === '/companyProfile') {
        return <CompanyProfile />;
      } else if (decodedToken.role === 'user' && location.pathname === '/userProfile') {
        return <UserProfile />;
      } else {
        return <p>Page not found</p>;
      }
    }
  };

  const checkLocalStorage = () => {
    if (location.pathname === "/") {
      localStorage.removeItem('jwt');
      localStorage.removeItem('userId');
      localStorage.removeItem('companyId');
    }
  };

  useEffect(() => {
    checkLocalStorage();
  }, [location.pathname]);

  // Call the async function in a useEffect hook to retrieve the JSX and store it in state
  const [element, setElement] = useState(null);
  useEffect(() => {
    const getElement = async () => {
      const jsx = await checkToken();
      setElement(jsx);
    };
    getElement();
  }, [decodedToken, location.pathname]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/logIn' element={<LogIn />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/loginUser' element={<LoginForm />} />
      <Route path='/register' element={<Register />} />
      <Route path='/companyRegister' element={<RegisterCompany />} />
      <Route path='/userPage' element={element} />
      <Route path='/jobs' element={<Jobs />} />
      <Route path='/UserProfile' element={element} />
      <Route path='/companylogin' element={<CompanyLogin />} />
      <Route path='/companyPage' element={element} />
      <Route path='/create_statemant' element={element} />
      <Route path='/companyProfile' element={element} />
      <Route path='/allCompanies' element={<AllCompanies />} />
    </Routes>
  );
}
