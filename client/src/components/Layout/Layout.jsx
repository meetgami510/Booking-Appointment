import React from 'react'
import axios from 'axios'
import "../../styles/LayoutStyles.css"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../redux/features/userSlice"
import { Badge } from 'antd';
import { adminMenu, doctorMenu, userMenu } from './data';

import { message } from 'antd'

function Layout({ children, removeCookies }) {
  const { user } = useSelector(state => state.user)

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeCookies('token');
    message.success('logout successfully');
    navigate('/login')
  }

  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>DOC APP</h6>
          </div>
          <hr />
          <div className="menu">

            {SidebarMenu.map(menu => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              )
            })}
            <div className={`menu-item `} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to='/login'>LogOut</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content" style={{ cursor: 'pointer' }}>
              <Badge
                count={user && user.notifications.length}
                onClick={() => {
                  navigate('/notification')
                }}>
                <i className="fa-solid fa-bell"></i>
              </Badge>
              <Link to='/profile'>{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout