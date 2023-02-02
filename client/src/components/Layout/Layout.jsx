import React from 'react'
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { Row, message } from 'antd';
import { useDispatch } from 'react-redux';

function Layout({children}) {
  return (
    <div className="main">
        <div className="layout">
            <div className="sidebar">
                <div className="logo">  
                    <h6>DOC APP</h6>
                </div>
                <div className="menu">Menu</div>
            </div>
            <div className="content">
                <div className="header">
                    <div className="body">{children}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Layout