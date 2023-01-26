import React from 'react'
import {Button, Form, Input }  from 'antd'
import "../styles/RegisterStyles.css"
import {Link} from 'react-router-dom'

function Login() {
  const onfinishHandler = (values)=> {
    console.log(values);
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
