import React,{useEffect, useState} from 'react'
import {Form,Input,message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'
import axios from 'axios';
import Spinner from '../component/Layout/Spinner';
const Register = () => {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false);
    const submitHandler = async(values) => {
        try{
            setLoading(true);
            await axios.post('/api/v1/users/register',values);
            message.success('Registration Successful');
            setLoading(false);
            navigate('/login');
        }
        catch(error){
            setLoading(false);
            message.error("Invalid Username or password");
        }
    };
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate("/");
        }
    },[navigate]);
  return (
    <div className = "registry">
    <div className = "register-page">
        {loading && <Spinner />}
        <Form layout = "vertical" onFinish = {submitHandler}>
            <h1>Register Form</h1>
            <Form.Item label="Name" name = "name">
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name = "email">
                <Input type = "email" />
            </Form.Item>
            <Form.Item label="Password" name = "password">
                <Input type = "password" />
            </Form.Item>
            <div className = "reg-but">
                <button className="btn btn-primary">Register</button>
                <Link to = '/login'>Already Registered? Click here to Login</Link>
            </div>
        </Form>
    </div>
    </div>
  )
};

export default Register;
