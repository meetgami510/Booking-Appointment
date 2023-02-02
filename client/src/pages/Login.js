import React from 'react'
import { Form, Input ,message}  from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import "../styles/RegisterStyles.css"
import {Link,useNavigate} from 'react-router-dom'
import { setUser } from '../redux/features/userSlice'


function Login({setCookies}) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const onfinishHandler = async (values)=> {
    try{
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login',values)
      dispatch(hideLoading());
      if(res.data.success) {
        //res.cookie("jwtoken","hii meet");
        setCookies('token',res.data.token);
        //localStorage.setItem("token",res.data.token);
        message.success('Login successfully DONE');
        navigate('/');
      }else{
        dispatch(hideLoading());
        message.error(res.data.message)
      }

    }catch(error) {
      console.log(error);
      message.error('somthing went wrong')
    }
  }
  return (
    <div>
      <div className="form-container">
            <Form layout='vertical' onFinish={onfinishHandler} className="register-form">
                <h3 className='text-center'>Login From</h3>
                <Form.Item label="Email" name="email">
                    <Input type='email' required/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password' required/>
                </Form.Item>
                <Link to='/register' className='m-2'>
                    Not a User Register here
                </Link>
                <button className='btn btn-primary' type='submit'> Login </button>
            </Form>
        </div>
    </div>
  )
}

export default Login
