import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchStatements } from '../../features/statementSlice';
import './UserPage.css';
import { HeartOutlined, InstagramOutlined, MailOutlined, LinkedinOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom"
import { logOut } from '../../features/userSlice';
import logo from '../../logo/logo.jpg'
import NavBar from '../navbar/Nav-bar';

const UserPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchStatements());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logOut)
    navigate('/')
  }

  const iconStyle = {
  fontSize: "22px"  
}


  return (
    <div className="container">
      <NavBar/>
      <div className="main">
        <img src={logo} alt='Logo'/>
        <div className='context'>
          <h1 >Welcome to our website!</h1>
          <p>
            At Dream Job, we believe in the power of knowledge and the joy of discovery. Our platform is designed to provide you with a wealth of information and insights on a wide range of topics. Whether you're a student, a professional, or simply a curious individual, we're here to satisfy your thirst for knowledge.<br/><br/>

            Our commitment to accuracy and reliability sets us apart. We strive to bring you the most up-to-date information from trusted sources. Our team of experts and researchers meticulously curate and verify the content to ensure its quality. You can rely on us to deliver accurate and credible information every time.<br/><br/>

            Explore our diverse collection of articles, guides, and resources covering various fields, including science, technology, history, arts, and much more. Whether you're looking for in-depth analysis, practical tips, or fascinating facts, we have you covered. Our content is written in a reader-friendly manner, making complex concepts accessible to all.<br/><br/>

            We also understand the importance of engagement and interaction. That's why we provide a platform for discussion and community building. Join our vibrant community of learners, where you can ask questions, share insights, and engage in meaningful conversations. Learning is a collaborative journey, and we're here to foster an environment where everyone can learn from each other.<br/><br/>

            As technology advances, so do our ways of learning. That's why we embrace innovative tools and features to enhance your learning experience. Our interactive quizzes, videos, and multimedia content will make your learning journey engaging and enjoyable. We strive to make learning an immersive and interactive process that keeps you coming back for more.<br/><br/>

            Whether you're a lifelong learner, a student preparing for exams, or a professional seeking to expand your knowledge base, Dream Job is your go-to resource. We're dedicated to empowering individuals with knowledge and fostering a love for learning. Start exploring our site today and embark on an exciting journey of discovery!<br/><br/>

            Remember, learning never stops, and with Dream Job, you'll always have a trusted companion on your quest for knowledge.<br/><br/>
          </p>
        </div>
      </div>
      <div className='footer'>
        <p>
          Thank you for visiting our website!<HeartOutlined style={iconStyle}/><br/>
          At Dream Job, we are dedicated to providing you with the most accurate and reliable information available. <br/>Our team of experts works tirelessly to ensure that the content you find here is of the highest quality and meets your needs.<br/>

          We value your feedback and encourage you to reach out to us with any questions, suggestions, or concerns. <br/>Your input is crucial in helping us improve and continue to provide valuable resources to our community.<br/>


          Stay curious, stay inspired!<br/>

          The Dream Job Team</p>
          <div className='contact-box'>
            <p>For questions and suggestions</p>
              <div className='contact'>
                <li><MailOutlined style={iconStyle}/>   dreamjob@gmail.com</li>
                <li><InstagramOutlined style={iconStyle}/>   dream_job</li>
                <li><LinkedinOutlined style={iconStyle}/>   Dream Job</li>
              </div>
          </div>
      </div>
    </div>
  );
};

export default UserPage;
