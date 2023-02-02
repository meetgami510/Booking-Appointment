import React from 'react'
import {Button, Form, Input, message }  from 'antd'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import "../styles/RegisterStyles.css"
import {Link , useNavigate} from 'react-router-dom'
function Register() {

    const navigate = useNavigate()
    const dispatch = useDispatch();
   
    const onfinishHandler = async (values)=> {
        try{
          console.log(values);
          dispatch(showLoading());
          const res = await axios.post('/api/v1/user/register',values);
          dispatch(hideLoading());
          console.log(res);
          if(res.data.success) {
            message.success('Register Successfully!')
            navigate('/login');
          }else{
            message.error(res.data.message)
          }
        }catch(error) {
          console.log(error);
          dispatch(hideLoading());
          message.error('Something Went Wrong')
        }
        
    }
  return (
    <div>   
      <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler} className="register-form">
            <h3 className='text-center'>Register From</h3>
            <Form.Item label="Name" name="name">
                <Input type='text' required/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email' required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password' required/>
            </Form.Item>
            <Link to='/login' className='m-2'>
                Already User Login here 
            </Link>
            <button className='btn btn-primary' type='submit'> Register </button>
        </Form>
      </div>
    </div>
  )
}

export default Register
