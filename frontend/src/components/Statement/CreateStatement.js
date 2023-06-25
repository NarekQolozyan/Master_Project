import React, { useState } from 'react';
import { createStatements } from '../../features/statementSlice';
import { useNavigate } from 'react-router-dom';
import { companyLogOut } from '../../features/companySlice';
import { useDispatch, useSelector } from 'react-redux';
import './CreateStatement.css';
import { Button, Form, Input } from 'antd';
import NavBar from '../navbar/Nav-bar';


export default function CreateStatement() {
  const company = useSelector((state) => state.company.company);
  const error = useSelector((state) => state.company.error);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [profession, setProfession] = useState('');
  const [err, setErr] = useState('');

  const photo = company.image;
  const companyId = company.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreating = () => {
    try {
      dispatch(createStatements({ category, description, skills, salary, jobType, photo, experience, location, companyId, profession }));
      if (!error) {
        alert("Statement created successfully");
        navigate('/companyPage')
      } else {
        setErr('Invalid register credentials');
      }
    } catch (err) {
      console.error("There was an error registered in: ", err);
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <NavBar/>
      <div className='statement-container'>
        <div className='myStatement'>
          <h2>Ստեղծել հայտարարություն</h2>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  message: 'Please input the category!',
                },
              ]}
            >
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  message: 'Please input the description!',
                },
              ]}
            >
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Skills"
              name="skills"
            >
              <Input value={skills} onChange={(e) => setSkills(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[
                {
                  message: 'Please input the salary!',
                },
              ]}
            >
              <Input value={salary} onChange={(e) => setSalary(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[
                {
                  message: 'Please input the job type!',
                },
              ]}
            >
              <Input value={jobType} onChange={(e) => setJobType(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[
                {
                  message: 'Please input the experience!',
                },
              ]}
            >
              <Input value={experience} onChange={(e) => setExperience(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[
                {
                  message: 'Please input the location!',
                },
              ]}
            >
              <Input value={location} onChange={(e) => setLocation(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Profession"
              name="profession"
              rules={[
                {
                  message: 'Please input the location!',
                },
              ]}
            >
              <Input value={profession} onChange={(e) => setProfession(e.target.value)} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' onClick={handleCreating}>Ստեղծել</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
