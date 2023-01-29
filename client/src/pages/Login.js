import React from 'react'
import { Form, Input ,message}  from 'antd'
import axios from 'axios'
import "../styles/RegisterStyles.css"
import {Link,useNavigate} from 'react-router-dom'


function Login() {
  const navigate = useNavigate()
  const onfinishHandler = async (values)=> {
    try{
      const res = await axios.post('/api/v1/user/login',values)
      if(res.data.success) {
        //res.cookie("jwtoken","hii meet");
        localStorage.setItem("token",res.data.token);
        message.success('Login successfully DONE');
        navigate('/');
      }else{
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
