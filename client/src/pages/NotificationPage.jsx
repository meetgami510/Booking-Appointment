import React, { useEffect } from 'react'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, message } from 'antd';
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/userSlice';

const NotificationPage = ({ cookies, removeCookies }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    console.log(user);

    const handlerMarkAllRead = async () => {
        console.log('eirheo');
        

    }
    return (
        <Layout removeCookies={removeCookies}>
            <h4 className="p-3 text-center">Notification Page</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className="d-flex justify-content-end">
                        {
                            user?.notifications.length !== 0 ?
                                <h4 className='p-2' onClick={handlerMarkAllRead}>Mark All Read</h4> : <h4 className="p-2">no notifications</h4>
                        }
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage