import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { hideLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';

const Users = ({ cookies, removeCookies }) => {
    const [userList,setUserList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const {token} = cookies;

        const fetchData = async () => {
            try{
                const res = await axios.get('/api/admin/get-all-users',{
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                dispatch(hideLoading());
                if (res.data.success) {
                    console.log(res.data.users);
                    setUserList(res.data.users);
                } else {
                    message.error(res.data.message);
                }
            }catch(error) {
                console.log(error);
                console.log(error);
                dispatch(hideLoading());
                message.error('wrong when get-all-user');
            }
        }
        fetchData();
    },[]);

    const columns = [
        {
            title:"Name",
            dataIndex:"name",
        },
        {
            title:"Email",
            dataIndex:"email",
        },
        {
            title:"Doctor",
            dataIndex:"isDoctor",
            render:(text,record) => <span>{record.isDoctor ? "Yes" : "No" }</span>
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    <button className="btn btn-danger">Block</button>
                </div>
            ),
        },
    ]

  return (
    <Layout>
        <h1 className='text-center m-2'>User List</h1>
        <Table columns={columns} dataSource={userList} />
    </Layout>
  )
}

export default Users