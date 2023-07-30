import React, { useEffect, useState } from 'react'
import UsersTable from './UsersTable'
import { Link } from 'react-router-dom'

const SideNav = () => {



    return (
        <>
            <ul style={{ backgroundColor: "#fc2f70" }} className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </a>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Users</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/adduser">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Add Users</span></Link>
                </li>
            </ul>
        </>
    )
}

export default SideNav
