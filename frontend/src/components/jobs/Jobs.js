import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatements, selectAllStatements, fetchStatementById } from '../../features/statementSlice';
import './Jobs.css';
import { EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NavBar from '../navbar/Nav-bar';

const Jobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statements = useSelector(selectAllStatements);
  useEffect(() => {
    dispatch(fetchStatements());
  }, [dispatch]);

  const iconStyle = {
    fontSize: '22px',
  };

  const handleNavigate = (statementId) => {
    dispatch(fetchStatementById(statementId));
    navigate('/statement');
  };

  return (
    <div className="container">
      <NavBar/>
      <div className="header">
        {statements.map((statement) => (
          <div className="statement" key={statement.id}>
            <div className='main-div'>
              <div className='image'>
                <img src={`http://localhost:3005/${statement.image}`} alt="Statement" style={{ width: "100px", height: "100px" }} />
              </div>
              <div className='info'>
                <p className='profession'>{statement.profession}</p>
                <p className='companyName'>{statement.companyName}</p>
                <div className='details'>
                  <div className='location'>
                    <EnvironmentFilled style={iconStyle} />
                    <p>{statement.location}</p>
                  </div>
                  <div className='time'>
                    <ClockCircleFilled style={iconStyle} />
                    <p>{statement.createdAt}</p>
                  </div>
                </div>
                </div>
              </div>
              <div className='footer-div'>
                <div className='category'>
                  <p>Category: </p><a>{statement.category}</a><br/><br/>
                </div>
                <div className='experience'>
                  <p>Experience: </p><a>{statement.experience}</a><br/><br/>
                </div>
                <div className='skills'>
                  <p>Skills:      </p><a>{statement.skills}</a><br/><br/>
                </div>
                <div className='jobType'>
                  <p>Job Type: </p><a>{statement.jobType}</a><br/><br/>
                </div>
                <div className='description'>  
                  <p>Description</p>
                  <a>{statement.description}</a>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
