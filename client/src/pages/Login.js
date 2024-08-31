import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Spinner from '../component/Layout/Spinner';
const Login = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler= async (values)=>{
        try{
            setLoading(true);
            const {data} = await axios.post('/api/v1/users/login',values);
            message.success('login success');
            setLoading(false);
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
            navigate('/');
        }
        catch(error){
            setLoading(false);
            message.error("Something went Wrong")
        }
    };
    
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate("/");
        }
    },[navigate]);
    return (
    <div className = "loginry">
    <div className = 'login-page'>
        {loading && <Spinner/>}
        <Form layout = "vertical" onFinish={submitHandler}>
            <h1 className="mb-5">Login Page</h1>
            <Form.Item label="Email" name = "email">
                <Input type = "email" />
            </Form.Item>
            <Form.Item label="Password" name = "password">
                <Input type = "password" />
            </Form.Item>
            <div className = "reg-but">
                <button className="btn btn-primary">Login</button>
                <Link to = '/register'>Not a User? Click here to register</Link>
            </div>
        </Form>
    </div>
    </ div>
  )
}

export default Login;
