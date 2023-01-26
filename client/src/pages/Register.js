import React from 'react'
import {Button, Form, Input }  from 'antd'
import "../styles/RegisterStyles.css"
function Register() {

    const onfinishHandler = (values)=> {
        console.log(values);
    }
  return (
    <div>
      <h1> Register </h1>
      <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler}>
            <h1>Register From</h1>
            <Form.Item label="Name" name="name">
                <Input type='text' required/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type='email' required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type='password' required/>
            </Form.Item>
            <button className='btn btn-primary' type='submit'> Register </button>
        </Form>
      </div>
    </div>
  )
}

export default Register
