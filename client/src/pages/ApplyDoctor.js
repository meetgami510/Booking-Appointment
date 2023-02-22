import Layout from './../components/Layout/Layout'
import React from 'react'
import { Col, Row, Form, Input, TimePicker, message } from 'antd';
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from 'moment';


const ApplyDoctor = ({ cookies }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.user)

    
    const handleFinish = async (values) => {
        const { token } = cookies;
        try {

            console.log(values);
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/apply-doctor', {
                ...values,
                userId: user._id,
                timings: [
                    moment(values.timings[0]).format("HH:mm"),
                    moment(values.timings[1]).format("HH:mm"),
                ],
            },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                }
            );
            dispatch(hideLoading());
            if (!res.data.success) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                navigate('/');
            }
            console.log(res.data)

        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }
    return (
        <Layout>
            <h1 className='text-center'>Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <h6>Personal Details</h6>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='First Name'
                            name="firstName"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='your first name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='First Name'
                            name="lastName"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='your last name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Phone no.'
                            name="phone"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='your contact no' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Email'
                            name="email"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='Enter you Email no' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Website'
                            name="website"
                        >
                            <Input type='text' placeholder='your website' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Address'
                            name="address"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='your clinic address' />
                        </Form.Item>
                    </Col>
                </Row>
                <h4>Professional Details</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Specialization'
                            name="specialization"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='specialization' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Experience'
                            name="experience"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='experience' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Fees Per Cunsaltation'
                            name="feesPerCunsaltation"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type='text' placeholder='feesPerCunsaltation' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label='Timings'
                            name="timings"
                            required
                        >
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className='btn btn-primary form-btn' type='submit'>
                            Submit
                        </button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor